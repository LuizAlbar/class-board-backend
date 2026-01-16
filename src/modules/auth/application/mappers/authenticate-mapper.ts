import type { AuthenticateResponseDTO } from "../dtos/authenticate.ts";
import type { UserDto } from "../dtos/user-dtos.ts";

export class AuthenticateMapper {
	static toDTO(
		user: UserDto,
		refreshToken: string,
		accessToken: string,
	): AuthenticateResponseDTO {
		return { user, refreshToken, accessToken };
	}
}
