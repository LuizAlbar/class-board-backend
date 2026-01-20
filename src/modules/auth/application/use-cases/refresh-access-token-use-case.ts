import { InvalidCookieError } from "../../domain/errors/invalid-cookie-error.ts";
import { UnauthorizedUserError } from "../../domain/errors/unauthorized-user-error.ts";
import type { IRefreshTokenRepository } from "../../domain/repositories/refresh-tokens-repository.ts";
import type { IAccessTokenProviderService } from "../../domain/services/access-token-provider-service.ts";
import type { ITokenSignatureService } from "../../domain/services/token-signature-service.ts";
import type { IAccessTokenPayloadDTO } from "../dtos/access-token-dto.ts";

export class RefreshAccessTokenUseCase {
	constructor(
		private refreshTokensRepository: IRefreshTokenRepository,
		private tokenSignatureService: ITokenSignatureService,
		private accessTokenService: IAccessTokenProviderService,
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

		const userPayload: IAccessTokenPayloadDTO = {
			sub: { id: refreshToken.userId },
		};
		const accessToken =
			this.accessTokenService.generateAccessToken(userPayload);

		return accessToken;
	}
}
