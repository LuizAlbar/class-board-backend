import { ResourceNotFoundError } from "../../domain/errors/resource-not-found-error.ts";
import type { IUsersRepository } from "../../domain/repositories/users-repository.ts";

export class GetProfileUseCase {
	constructor(private usersRepository: IUsersRepository) {}
	async execute(userId: string) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return { user };
	}
}
