import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { User, UserRole } from "../../domain/entities/User.ts";
import { UnauthorizedUserError } from "../../domain/errors/unauthorized-user-error.ts";
import { InMemoryTokensRepository } from "../../domain/repositories/in-memory/in-memory-tokens-repository.ts";
import { InMemoryUsersRepository } from "../../domain/repositories/in-memory/in-memory-users-repository.ts";
import { AccessTokenServiceMock } from "./mocks/AccessTokenServiceMock.ts";
import { TokenSignatureServiceMock } from "./mocks/TokenSignatureServiceMock.ts";
import { RefreshAccessTokenUseCase } from "./refresh-access-token.ts";

const tokenSignatureService = new TokenSignatureServiceMock();
const accessTokenService = new AccessTokenServiceMock();
let usersRepository: InMemoryUsersRepository;
let tokensRepository: InMemoryTokensRepository;
let sut: RefreshAccessTokenUseCase;

const userData = new User({
	id: randomUUID(),
	name: "John",
	email: "john@email",
	password: "12345678",
	created_at: new Date(),
	updated_at: new Date(),
	role: UserRole.ESTUDANTE,
});

describe("Refresh Token Use Case", () => {
	beforeEach(() => {
		tokensRepository = new InMemoryTokensRepository();
		usersRepository = new InMemoryUsersRepository();
		sut = new RefreshAccessTokenUseCase(
			tokensRepository,
			tokenSignatureService,
			accessTokenService,
		);
	});

	it("should be able to refresh token", async () => {
		await usersRepository.create(userData);
		const refreshToken = await tokensRepository.generate(userData.id);

		const auth = await sut.execute(refreshToken.token, {
			sub: { id: userData.id, role: userData.role },
		});

		expect(auth).toEqual(expect.any(String));
	});

	it("should not be possible to genereate a new token with an invalid token", async () => {
		await usersRepository.create(userData);
		await expect(() =>
			sut.execute("invalid token", {
				sub: { id: userData.id, role: userData.role },
			}),
		).rejects.toBeInstanceOf(UnauthorizedUserError);
	});
});
