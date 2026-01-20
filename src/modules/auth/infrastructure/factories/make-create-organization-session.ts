import type { FastifyInstance } from "fastify";
import { PrismaMembershipsRepository } from "@/modules/membership/infrastructure/database/repositories/prisma/prisma-memberships-repository.ts";
import { CreateOrganizationSessionUseCase } from "../../application/use-cases/create-organization-session-use-case.ts";
import { FastifyJWTProvider } from "../config/fastify-jwt.ts";

export function makeCreateOrganizationSession(appInstance: FastifyInstance) {
	const membershipRepository = new PrismaMembershipsRepository();
	const accessTokenService = new FastifyJWTProvider(appInstance);
	const createOrganizationSessionUseCase = new CreateOrganizationSessionUseCase(
		membershipRepository,
		accessTokenService,
	);

	return createOrganizationSessionUseCase;
}
