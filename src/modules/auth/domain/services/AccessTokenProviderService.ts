import { AccessTokenPayloadDTO } from "../../application/dtos/access-token.ts";

export interface AccessTokenProviderService {
	generateAccessToken(payload: AccessTokenPayloadDTO): string;
}
