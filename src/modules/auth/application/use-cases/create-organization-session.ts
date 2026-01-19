import type { MembershipsRepository } from "@/modules/membership/domain/repositories/memberships-repository.ts";
import { ForbiddenOrganizationError } from "../../domain/errors/forbidden-organization-error.ts";
import type { AccessTokenProviderService } from "../../domain/services/AccessTokenProviderService.ts";
import type { AuthenticateOrganizationSessionDTO } from "../dtos/authenticate-dto.ts";

export class CreateOrganizationSessionUseCase {
	constructor(
		private membershipsRepository: MembershipsRepository,
		private accessTokenService: AccessTokenProviderService,
	) {}

	async execute({
		userId,
		organizationId,
	}: AuthenticateOrganizationSessionDTO) {
		const membership = await this.membershipsRepository.findUserInAOrganization(
			{ userId: userId, organizationId: organizationId },
		);

		if (!membership) {
			throw new ForbiddenOrganizationError();
		}

		const token = this.accessTokenService.generateAccessToken({
			sub: {
				id: membership.userId,
				orgId: membership.organizationId,
				role: membership.role,
			},
		});

		return token;
	}
}
