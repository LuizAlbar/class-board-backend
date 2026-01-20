import type { IFindUserMembershipDTO } from "@/modules/membership/application/dtos/membership-dto.ts";
import type { Membership } from "../../entities/membership-entity.ts";
import type { IMembershipsRepository } from "../memberships-repository.ts";

export class InMemoryMembershipsRepository implements IMembershipsRepository {
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

	async findUserAndOrganization(
		data: IFindUserMembershipDTO,
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
