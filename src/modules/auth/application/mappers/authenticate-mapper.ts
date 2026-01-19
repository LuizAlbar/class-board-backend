import type { AuthenticateResponseDTO } from "../dtos/authenticate-dto.ts";
import type { UserDto } from "../dtos/user-dto.ts";

export class AuthenticateMapper {
	static toDTO(
		user: UserDto,
		refreshToken: string,
		accessToken: string,
	): AuthenticateResponseDTO {
		return { user, refreshToken, accessToken };
	}
}
