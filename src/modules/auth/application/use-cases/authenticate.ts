import { InvalidCredentialError } from "../../domain/errors/invalid-credential-error.ts";
import type { RefreshTokenRepository } from "../../domain/repositories/refresh-token-repository.ts";
import type { UsersRepository } from "../../domain/repositories/users-repository.ts";
import { AccessTokenProviderService } from "../../domain/services/AccessTokenProviderService.ts";
import type { HashService } from "../../domain/services/HashService.ts";
import { AuthenticateResponseDTO } from "../dtos/authenticate.ts";
import type { AuthenticateUserDTO, UserDto } from "../dtos/user-dtos.ts";
import { UserMapper } from "../mappers/user-mapper.ts";

export class AuthenticateUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private refreshTokensRepository: RefreshTokenRepository,
		private accessTokenService: AccessTokenProviderService,
		private hashService: HashService,
	) {}

	async execute({ email, password }: AuthenticateUserDTO): Promise<AuthenticateResponseDTO> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialError();
		}

		const doesPasswordMatch = await this.hashService.compare(
			password,
			user.password,
		);

		if (!doesPasswordMatch) {
			throw new InvalidCredentialError();
		}

		await this.refreshTokensRepository.deleteByUserId(user.id);
		const refreshToken = this.refreshTokensRepository.generate(user.id);

		const token = this.accessTokenService.generateAccessToken({sub: user.id, role: user.role})

		return {
			user: UserMapper.toDTO(user),
			refreshToken: (await refreshToken).token,
			accessToken: token
		};
	}
}
