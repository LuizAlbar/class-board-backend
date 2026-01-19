import type { Role } from "../../domain/entities/Membership.ts";

export interface MembershipDTO {
	id: string;
	role: Role;
	userId: string;
	organizationId: string;
	created_at: Date;
	updated_at: Date;
}

export interface CreateMembershipDTO {
	role: Role;
	userId: string;
	organizationId: string;
}
