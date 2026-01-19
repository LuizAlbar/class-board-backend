import type { AccessTokenPayloadDTO } from "../../application/dtos/access-token-dto.ts";

export interface AccessTokenProviderService {
	generateAccessToken(payload: AccessTokenPayloadDTO): string;
}
