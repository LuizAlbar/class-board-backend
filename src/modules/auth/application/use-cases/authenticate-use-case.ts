import { InvalidCredentialError } from "../../domain/errors/invalid-credential-error.ts";
import type { IRefreshTokenRepository } from "../../domain/repositories/refresh-tokens-repository.ts";
import type { IUsersRepository } from "../../domain/repositories/users-repository.ts";
import type { IAccessTokenProviderService } from "../../domain/services/access-token-provider-service.ts";
import type { IHashService } from "../../domain/services/hash-service.ts";
import type { IAuthenticateResponseDTO } from "../dtos/authenticate-dto.ts";
import type { IAuthenticateUserDTO } from "../dtos/user-dto.ts";
import { UserMapper } from "../mappers/user-mapper.ts";

export class AuthenticateUseCase {
	constructor(
		private usersRepository: IUsersRepository,
		private refreshTokensRepository: IRefreshTokenRepository,
		private accessTokenService: IAccessTokenProviderService,
		private hashService: IHashService,
	) {}

	async execute({
		email,
		password,
	}: IAuthenticateUserDTO): Promise<IAuthenticateResponseDTO> {
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

		const token = this.accessTokenService.generateAccessToken({
			sub: {
				id: user.id,
			},
		});

		return {
			user: UserMapper.toDTO(user),
			refreshToken: (await refreshToken).token,
			accessToken: token,
		};
	}
}
