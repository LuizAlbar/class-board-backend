import type { UserRole } from "../../domain/entities/User.ts";

export interface UserDto {
	id: string;
	name: string;
	email: string;
	created_at: Date;
	updated_at: Date;
	role: UserRole;
}

export interface CreateUserDTO {
	name: string;
	email: string;
	password: string;
	role: UserRole;
}

export interface AuthenticateUserDTO {
	email: string;
	password: string;
}
