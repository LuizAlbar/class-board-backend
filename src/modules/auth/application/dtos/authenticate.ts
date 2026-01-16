import type { UserDto } from "./user-dtos.ts";

export interface AuthenticateResponseDTO {
	user: UserDto;
	refreshToken: string;
	accessToken: string;
}
