import { randomUUID } from "node:crypto";
import { User } from "../../domain/entities/user-entity.ts";
import { UserAlreadyExists } from "../../domain/errors/user-already-exists-error.ts";
import { WeakPasswordError } from "../../domain/errors/weak-password-error.ts";
import type { IUsersRepository } from "../../domain/repositories/users-repository.ts";
import type { IHashService } from "../../domain/services/hash-service.ts";
import type { ICreateUserDTO } from "../dtos/user-dto.ts";

export class RegisterUseCase {
	constructor(
		private usersRepository: IUsersRepository,
		private hashService: IHashService,
	) {}

	async execute(dto: ICreateUserDTO) {
		const userExists = await this.usersRepository.findByEmail(dto.email);

		if (userExists) {
			throw new UserAlreadyExists();
		}

		const hashedPassword = await this.hashService.hash(dto.password);

		const newUser = new User({
			id: randomUUID(),
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
			created_at: new Date(),
			updated_at: new Date(),
		});

		if (dto.password.length < 8) {
			throw new WeakPasswordError();
		}
		const user = await this.usersRepository.create(newUser);

		return { user };
	}
}
