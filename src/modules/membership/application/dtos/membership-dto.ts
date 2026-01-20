import type { Role } from "../../domain/entities/membership-entity.ts";

export interface IMembershipDTO {
	id: string;
	role: Role;
	userId: string;
	organizationId: string;
	created_at: Date;
	updated_at: Date;
}

export interface ICreateMembershipDTO {
	role: Role;
	userId: string;
	organizationId: string;
}

export interface IFindUserMembershipDTO {
	userId: string;
	organizationId: string;
}
