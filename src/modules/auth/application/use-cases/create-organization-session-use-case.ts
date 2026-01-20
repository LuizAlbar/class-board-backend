import type { IMembershipsRepository } from "@/modules/membership/domain/repositories/memberships-repository.ts";
import { ForbiddenOrganizationError } from "../../domain/errors/forbidden-organization-error.ts";
import type { IAccessTokenProviderService } from "../../domain/services/access-token-provider-service.ts";
import type { IAuthenticateOrganizationSessionDTO } from "../dtos/authenticate-dto.ts";

export class CreateOrganizationSessionUseCase {
	constructor(
		private membershipsRepository: IMembershipsRepository,
		private accessTokenService: IAccessTokenProviderService,
	) {}

	async execute({
		userId,
		organizationId,
	}: IAuthenticateOrganizationSessionDTO) {
		const membership = await this.membershipsRepository.findUserAndOrganization(
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
