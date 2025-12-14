import { PrismaUserRepository } from "@/modules/auth/domain/repositories/prisma/prisma-users-repository.ts";
import { BcryptHashService } from "@/modules/auth/infrastructure/config/bcrypt.ts";
import { RegisterUseCase } from "../register.ts";

export function makeRegisterUseCase() {
	const prismaUserRepository = new PrismaUserRepository();
	const hashService = new BcryptHashService();
	const registerUseCase = new RegisterUseCase(
		prismaUserRepository,
		hashService,
	);

	return registerUseCase;
}
