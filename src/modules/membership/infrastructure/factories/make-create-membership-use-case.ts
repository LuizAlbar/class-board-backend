import { CreateMembershipUseCase } from "@/modules/membership/application/use-cases/create-membership-use-case.ts";
import { PrismaMembershipsRepository } from "@/modules/membership/infrastructure/database/repositories/prisma/prisma-memberships-repository.ts";

export function makeCreateMembershipUseCase() {
	const prismaMembershipRepository = new PrismaMembershipsRepository();

	const createMembershipUseCase = new CreateMembershipUseCase(
		prismaMembershipRepository,
	);

	return createMembershipUseCase;
}
