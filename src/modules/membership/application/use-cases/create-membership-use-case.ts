import { randomUUID } from "node:crypto";
import { Membership } from "../../domain/entities/membership-entity.ts";

import type { IMembershipsRepository } from "../../domain/repositories/memberships-repository.ts";
import type { ICreateMembershipDTO } from "../dtos/membership-dto.ts";

export class CreateMembershipUseCase {
	constructor(private membershipRepository: IMembershipsRepository) {}

	async execute(dto: ICreateMembershipDTO) {
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
