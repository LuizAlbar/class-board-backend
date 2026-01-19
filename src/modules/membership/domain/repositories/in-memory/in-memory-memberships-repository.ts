import type { findUserMembershipDTO } from "@/modules/membership/application/dtos/membership-dto.ts";
import type { Membership } from "../../entities/Membership.ts";
import type { MembershipsRepository } from "../memberships-repository.ts";

export class InMemoryMembershipsRepository implements MembershipsRepository {
	public items: Membership[] = [];

	async findById(id: string) {
		const membership = this.items.find((item) => item.id === id);

		if (!membership) {
			return null;
		}

		return membership;
	}

	async create(membership: Membership) {
		this.items.push(membership);

		return membership;
	}

	async findUserInAOrganization(
		data: findUserMembershipDTO,
	): Promise<Membership | null> {
		const membership = this.items.find(
			(item) =>
				item.userId === data.userId &&
				item.organizationId === data.organizationId,
		);

		if (!membership) {
			return null;
		}

		return membership;
	}
}
