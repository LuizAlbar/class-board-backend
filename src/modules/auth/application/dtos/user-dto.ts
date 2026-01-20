export interface IUserDto {
	id: string;
	name: string;
	email: string;
	created_at: Date;
	updated_at: Date;
}

export interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}

export interface IAuthenticateUserDTO {
	email: string;
	password: string;
}
