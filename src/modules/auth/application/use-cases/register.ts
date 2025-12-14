import { randomUUID } from "node:crypto";
import { User } from "../../domain/entities/User.ts";
import type { UsersRepository } from "../../domain/repositories/users-repository.ts";
import type { HashService } from "../../domain/services/HashService.ts";
import type { CreateUserDTO } from "../dtos/user-dtos.ts";

export class RegisterUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private hashService: HashService,
	) {}

	async execute(dto: CreateUserDTO) {
		const userExists = await this.usersRepository.findByEmail(dto.email);

		if (userExists) {
			throw new Error("User already exists");
		}

		const hashedPassword = await this.hashService.hash(dto.password);

		const user = new User({
			id: randomUUID(),
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
			role: dto.role,
			created_at: new Date(),
			updated_at: new Date(),
		});

		return this.usersRepository.create(user);
	}
}
