import type { IAccessTokenProviderService } from "@/modules/auth/domain/services/access-token-provider-service.ts";
import type { IAccessTokenPayloadDTO } from "../../dtos/access-token-dto.ts";

export class AccessTokenServiceMock implements IAccessTokenProviderService {
	generateAccessToken(payload: IAccessTokenPayloadDTO): string {
		return JSON.stringify(payload);
	}
}
