import { CreateOrganizationUseCase } from "../../application/use-cases/create-organization-use-case.ts";
import { PrismaOrganizationsRepository } from "../database/repositories/prisma/prisma-organizations-repository.ts";

export function makeCreateOrganizationUseCase() {
	const prismaOrganizationRepository = new PrismaOrganizationsRepository();
	const createOrganizationUseCase = new CreateOrganizationUseCase(
		prismaOrganizationRepository,
	);

	return createOrganizationUseCase;
}
