import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { User } from "../../domain/entities/user-entity.ts";
import { UnauthorizedUserError } from "../../domain/errors/unauthorized-user-error.ts";
import { InMemoryTokensRepository } from "../../domain/repositories/in-memory/in-memory-tokens-repository.ts";
import { InMemoryUsersRepository } from "../../domain/repositories/in-memory/in-memory-users-repository.ts";
import { AccessTokenServiceMock } from "./mocks/access-token-service-mock.ts";
import { TokenSignatureServiceMock } from "./mocks/token-signature-service-mock.ts";
import { RefreshAccessTokenUseCase } from "./refresh-access-token-use-case.ts";

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

		const auth = await sut.execute(refreshToken.token);

		expect(auth).toEqual(expect.any(String));
	});

	it("should not be possible to genereate a new token with an invalid token", async () => {
		await usersRepository.create(userData);
		await expect(() => sut.execute("invalid token")).rejects.toBeInstanceOf(
			UnauthorizedUserError,
		);
	});
});
