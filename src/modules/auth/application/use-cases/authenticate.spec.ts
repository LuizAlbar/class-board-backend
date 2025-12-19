import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { User, UserRole } from "../../domain/entities/User.ts";
import { InvalidCredentialError } from "../../domain/errors/invalid-credential-error.ts";
import { InMemoryUsersRepository } from "../../domain/repositories/in-memory/in-memory-users-repository.ts";
import { BcryptHashService } from "../../infrastructure/config/bcrypt.ts";
import { AuthenticateUseCase } from "./authenticate.ts";

let usersRepository: InMemoryUsersRepository;
const bcryptService = new BcryptHashService();
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
		sut = new AuthenticateUseCase(usersRepository, bcryptService);
	});

	it("should be able to authenticate", async () => {
		await usersRepository.create(userData);

		const user = await sut.execute({
			email: "john@email",
			password: "12345678",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate using a non-existent email", async () => {
		await usersRepository.create(userData);
		await expect(() =>
			sut.execute({ email: "non-existent@email.com", password: "12345678" }),
		).rejects.toBeInstanceOf(InvalidCredentialError);

		console.log(usersRepository.findByEmail("john@email"));
	});
});
