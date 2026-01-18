import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { User, UserRole } from "../../domain/entities/User.ts";
import { ResourceNotFoundError } from "../../domain/errors/resource-not-found.ts";
import { InMemoryUsersRepository } from "../../domain/repositories/in-memory/in-memory-users-repository.ts";
import { GetProfileUseCase } from "./get-profile.ts";

let usersRepository: InMemoryUsersRepository;
let sut: GetProfileUseCase;

const userData = new User({
	id: randomUUID(),
	name: "John",
	email: "john@email",
	password: "12345678",
	created_at: new Date(),
	updated_at: new Date(),
	role: UserRole.ESTUDANTE,
});

describe("Get Profile Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetProfileUseCase(usersRepository);
	});

	it("should be able to user profile", async () => {
		const newUser = await usersRepository.create(userData);

		const { user } = await sut.execute(newUser.id);

		expect(user.email).toEqual(newUser.email);
	});

	it("should not be able to get profile with a non-existing id", async () => {
		await expect(() => sut.execute("non-existing-id")).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
