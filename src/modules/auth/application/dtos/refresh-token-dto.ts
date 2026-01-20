export interface IRefreshTokenDTO {
	id: string;
	token: string;
	userId: string;
	expiresAt: Date;
}

export interface ICreateRefreshTokenDTO {
	token: string;
	userId: string;
	expiresAt: Date;
}
