import { GetProfileUseCase } from "../../application/use-cases/get-profile.ts";
import { PrismaUserRepository } from "../database/repositories/prisma/prisma-users-repository.ts";

export function makeGetProfileUseCase() {
	const userRepository = new PrismaUserRepository();
	const getProfileUseCase = new GetProfileUseCase(userRepository);

	return getProfileUseCase;
}
