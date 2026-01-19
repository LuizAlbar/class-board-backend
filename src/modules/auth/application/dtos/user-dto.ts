export interface UserDto {
	id: string;
	name: string;
	email: string;
	created_at: Date;
	updated_at: Date;
}

export interface CreateUserDTO {
	name: string;
	email: string;
	password: string;
}

export interface AuthenticateUserDTO {
	email: string;
	password: string;
}
