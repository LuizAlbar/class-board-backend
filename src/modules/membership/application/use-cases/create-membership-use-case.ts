import { randomUUID } from "node:crypto";
import { defineAbilityFor } from "@/shared/auth/abilities.ts";
import type { UserContext } from "@/shared/auth/models/user-context-model.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Membership } from "../../domain/entities/membership-entity.ts";
import type { IMembershipsRepository } from "../../domain/repositories/memberships-repository.ts";
import type { ICreateMembershipDTO } from "../dtos/membership-dto.ts";

export class CreateMembershipUseCase {
	constructor(private membershipRepository: IMembershipsRepository) {}

	async execute(dto: ICreateMembershipDTO, userContext: UserContext) {
		const newMembership = new Membership({
			id: randomUUID(),
			role: dto.role,
			userId: dto.userId,
			organizationId: dto.organizationId,
			created_at: new Date(),
			updated_at: new Date(),
		});

		const ability = defineAbilityFor(userContext);

		if (ability.cannot("create", "Membership")) {
			throw new ForbiddenActionError(
				"You don't have permission to create memberships",
			);
		}

		const membership = await this.membershipRepository.create(newMembership);

		return { membership };
	}
}
