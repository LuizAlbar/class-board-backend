import type { IUserDto } from "@/modules/auth/application/dtos/user-dto.ts";
import type { IMembershipDTO } from "@/modules/membership/application/dtos/membership-dto.ts";

export interface ITeacherDTO {
	id: string;
	userId: string;
	organizationId: string;
}

export interface ICreateTeacherDTO {
	userId: string;
	organizationId: string;
}

export interface IDeleteTeacherDTO {
	id: string;
}

export interface IQueryTeacherDTO {
	name?: string;
	email?: string;
	page: number;
	limit: number;
}

export interface IQueryTeacherResultDTO {
	id: string;
	userId: string;
	organizationId: string;
	name?: string;
	email?: string;
	page: number;
	limit: number;
}

export interface IQueryTeacherResultDTOV2 {
	id: string;
	userId: string;
	organizationId: string;
	membership: IMembershipDTO & {
		user: IUserDto;
	};
}
