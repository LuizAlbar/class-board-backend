import type { UserDto } from "./user-dto.ts";

export interface AuthenticateResponseDTO {
	user: UserDto;
	refreshToken: string;
	accessToken: string;
}
