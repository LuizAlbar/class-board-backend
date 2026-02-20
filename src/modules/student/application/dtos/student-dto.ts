import type { IUserDto } from "@/modules/auth/application/dtos/user-dto.ts";
import type { IMembershipDTO } from "@/modules/membership/application/dtos/membership-dto.ts";

export interface IStudentDTO {
	id: string;
	userId: string;
	ra: string;
	dateOfBirth: Date;
	organizationId: string;
}

export interface ICreateStudentDTO {
	userId: string;
	ra: string;
	dateOfBirth: Date;
	organizationId: string;
}

export interface IDeleteStudentDTO {
	id: string;
}

export interface IQueryStudentDTO {
	name?: string;
	email?: string;
	ra?: string;
	page: number;
	limit: number;
}

export interface IQueryStudentResultDTO {
	id: string;
	userId: string;
	organizationId: string;
	name?: string;
	email?: string;
	ra?: string;
	page: number;
	limit: number;
}

export interface IQueryStudentResultDTOV2 extends IStudentDTO {
	membership: IMembershipDTO & {
		user: IUserDto;
	};
}
