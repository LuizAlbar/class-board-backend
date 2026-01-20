import type { IAccessTokenPayloadDTO } from "../../application/dtos/access-token-dto.ts";

export interface IAccessTokenProviderService {
	generateAccessToken(payload: IAccessTokenPayloadDTO): string;
}
