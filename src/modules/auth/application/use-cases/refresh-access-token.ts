import { InvalidCookieError } from "../../domain/errors/invalid-cookie-error.ts";
import { UnauthorizedUserError } from "../../domain/errors/unauthorized-user-error.ts";
import type { RefreshTokenRepository } from "../../domain/repositories/refresh-token-repository.ts";
import type { AccessTokenProviderService } from "../../domain/services/AccessTokenProviderService.ts";
import type { TokenSignatureService } from "../../domain/services/TokenSignatureService.ts";
import type { AccessTokenPayloadDTO } from "../dtos/access-token.ts";

export class RefreshAccessTokenUseCase {
	constructor(
		private refreshTokensRepository: RefreshTokenRepository,
		private tokenSignatureService: TokenSignatureService,
		private accessTokenService: AccessTokenProviderService,
	) {}

	async execute(signedRefreshToken: string) {
		const { valid, value } =
			this.tokenSignatureService.unsign(signedRefreshToken);

		if (!valid || !value) {
			throw new InvalidCookieError();
		}

		const refreshToken = await this.refreshTokensRepository.findById(value);

		if (!refreshToken) {
			throw new UnauthorizedUserError();
		}

		const userPayload: AccessTokenPayloadDTO = {
			sub: { id: refreshToken.userId, role: refreshToken.userRole },
		};
		const accessToken =
			this.accessTokenService.generateAccessToken(userPayload);

		return accessToken;
	}
}
