import { randomUUID } from "node:crypto";
import { Membership } from "../../domain/entities/Membership.ts";

import type { MembershipsRepository } from "../../domain/repositories/memberships-repository.ts";
import type { CreateMembershipDTO } from "../dtos/membership-dto.ts";

export class CreateMembershipUseCase {
	constructor(private membershipRepository: MembershipsRepository) {}

	async execute(dto: CreateMembershipDTO) {
		const newMembership = new Membership({
			id: randomUUID(),
			role: dto.role,
			userId: dto.userId,
			organizationId: dto.organizationId,
			created_at: new Date(),
			updated_at: new Date(),
		});

		const membership = await this.membershipRepository.create(newMembership);

		return { membership };
	}
}
