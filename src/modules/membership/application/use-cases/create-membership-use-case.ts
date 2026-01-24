import { randomUUID } from "node:crypto";
import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Membership } from "../../domain/entities/membership-entity.ts";
import type { IMembershipsRepository } from "../../domain/repositories/memberships-repository.ts";
import type { ICreateMembershipDTO } from "../dtos/membership-dto.ts";

export class CreateMembershipUseCase {
	constructor(private membershipRepository: IMembershipsRepository) {}

	async execute(dto: ICreateMembershipDTO, userContext: IUserContext) {
		const newMembership = new Membership({
			id: randomUUID(),
			role: dto.role,
			userId: dto.userId,
			organizationId: dto.organizationId,
			created_at: new Date(),
			updated_at: new Date(),
		});

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("create", "Membership")) {
			throw new ForbiddenActionError(
				"You don't have permission to create memberships",
			);
		}

		const membership = await this.membershipRepository.create(newMembership);

		return { membership };
	}
}
