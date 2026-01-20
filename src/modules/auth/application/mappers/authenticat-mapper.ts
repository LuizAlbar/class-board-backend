import type { IAuthenticateResponseDTO } from "../dtos/authenticate-dto.ts";
import type { IUserDto } from "../dtos/user-dto.ts";

export class AuthenticateMapper {
	static toDTO(
		user: IUserDto,
		refreshToken: string,
		accessToken: string,
	): IAuthenticateResponseDTO {
		return { user, refreshToken, accessToken };
	}
}
