import type { Membership as PrismaMembership } from "@prisma/client";
import { Membership, type Role } from "../../domain/entities/Membership.ts";
import type {
	CreateMembershipDTO,
	MembershipDTO,
} from "../dtos/membership-dto.ts";

export class OrganizationMapper {
	static toDomain(raw: PrismaMembership): Membership {
		return new Membership({
			id: raw.id,
			role: raw.role as Role,
			userId: raw.userId,
			organizationId: raw.organizationId,
			created_at: raw.created_at,
			updated_at: raw.updated_at,
		});
	}

	static toPrisma(data: CreateMembershipDTO) {
		return {
			role: data.role,
			userId: data.userId,
			organizationId: data.organizationId,
		};
	}

	static toDTO(membership: Membership): MembershipDTO {
		return {
			id: membership.id,
			role: membership.role,
			userId: membership.userId,
			organizationId: membership.organizationId,
			created_at: membership.created_at,
			updated_at: membership.updated_at,
		};
	}
}
