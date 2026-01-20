import type { IUserDto } from "./user-dto.ts";

export interface IAuthenticateResponseDTO {
	user: IUserDto;
	refreshToken: string;
	accessToken: string;
}

export interface IAuthenticateOrganizationSessionDTO {
	userId: string;
	organizationId: string;
}
