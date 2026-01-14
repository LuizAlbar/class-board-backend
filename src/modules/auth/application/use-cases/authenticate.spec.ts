import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { User, UserRole } from "../../domain/entities/User.ts";
import { InvalidCredentialError } from "../../domain/errors/invalid-credential-error.ts";
import { InMemoryTokensRepository } from "../../domain/repositories/in-memory/in-memory-tokens-repository.ts";
import { InMemoryUsersRepository } from "../../domain/repositories/in-memory/in-memory-users-repository.ts";
import { BcryptHashService } from "../../infrastructure/config/bcrypt.ts";
import { AuthenticateUseCase } from "./authenticate.ts";
import { AccessTokenServiceMock } from "./mocks/AccessTokenServiceMock.ts";

let usersRepository: InMemoryUsersRepository;
let tokensRepository: InMemoryTokensRepository;
const bcryptService = new BcryptHashService();
const accessTokenService = new AccessTokenServiceMock();
let sut: AuthenticateUseCase;

const userData = new User({
	id: randomUUID(),
	name: "John",
	email: "john@email",
	password: await bcryptService.hash("12345678"),
	created_at: new Date(),
	updated_at: new Date(),
	role: UserRole.ESTUDANTE,
});

describe("Authenticate Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		tokensRepository = new InMemoryTokensRepository();
		sut = new AuthenticateUseCase(
			usersRepository,
			tokensRepository,
			accessTokenService,
			bcryptService,
		);
	});

	it("should be able to authenticate", async () => {
		await usersRepository.create(userData);

		const user = await sut.execute({
			email: "john@email",
			password: "12345678",
		});

		expect(user.user.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate using a non-existent email", async () => {
		await usersRepository.create(userData);
		await expect(() =>
			sut.execute({ email: "non-existent@email.com", password: "12345678" }),
		).rejects.toBeInstanceOf(InvalidCredentialError);
	});

	it("should not be able to authenticate using invalid credentials(password)", async () => {
		await usersRepository.create(userData);
		await expect(() =>
			sut.execute({ email: "john@email", password: "wrong_password" }),
		).rejects.toBeInstanceOf(InvalidCredentialError);
	});

	it("should be able to create a refresh token", async () => {
		const user = await usersRepository.create(userData);
		await sut.execute({ email: "john@email", password: "12345678" });

		const token = await tokensRepository.findById(user.id);

		expect(token?.userId).toEqual(user.id);
	});

	it("should not be possible for an user to have more than one refresh token", async () => {
		const user = await usersRepository.create(userData);
		await sut.execute({ email: "john@email", password: "12345678" });
		await sut.execute({ email: "john@email", password: "12345678" });

		const tokensList = tokensRepository.items.filter(
			(item) => item.userId === user.id,
		);

		expect(tokensList).toHaveLength(1);
	});

	it("should be able for an user to get an access token", async() => {
		await usersRepository.create(userData);
		const session = await sut.execute({ email: "john@email", password: "12345678" });
		
		expect(session.accessToken).toBeTruthy()
	})
});
