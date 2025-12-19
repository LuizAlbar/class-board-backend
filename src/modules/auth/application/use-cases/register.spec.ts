import { beforeEach, describe, expect, it } from "vitest";
import { UserRole } from "../../domain/entities/User.ts";
import { UserAlreadyExists } from "../../domain/errors/user-already-exists-error.ts";
import { WeakPasswordError } from "../../domain/errors/weak-password-error.ts";
import { InMemoryUsersRepository } from "../../domain/repositories/in-memory/in-memory-users-repository.ts";
import { BcryptHashService } from "../../infrastructure/config/bcrypt.ts";
import { RegisterUseCase } from "./register.ts";

let usersRepository: InMemoryUsersRepository;
const bcryptService = new BcryptHashService();
let sut: RegisterUseCase;

const userData = {
	name: "John",
	email: "john@email",
	password: "12345678",
	role: UserRole.ESTUDANTE,
};
describe("Register Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(usersRepository, bcryptService);
	});

	it("should be able to register an user", async () => {
		const { user } = await sut.execute(userData);
		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be able to register using an existing email", async () => {
		await sut.execute(userData);

		await expect(() => sut.execute(userData)).rejects.toBeInstanceOf(
			UserAlreadyExists,
		);
	});

	it("should hash user's password correctly", async () => {
		const { user } = await sut.execute(userData);
		const isPasswordCorrectlyHashed = await bcryptService.compare(
			"12345678",
			user.password,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it("should not be able to register with a password shorter than 8 characters", async () => {
		await expect(() =>
			sut.execute({
				name: "John",
				email: "john2@email",
				password: "123456",
				role: UserRole.ESTUDANTE,
			}),
		).rejects.toBeInstanceOf(WeakPasswordError);
	});
});
