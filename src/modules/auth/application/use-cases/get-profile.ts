import { ResourceNotFoundError } from "../../domain/errors/resource-not-found.ts";
import type { UsersRepository } from "../../domain/repositories/users-repository.ts";

export class GetProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}
	async execute(userId: string) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return { user };
	}
}
