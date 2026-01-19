import type { AccessTokenProviderService } from "@/modules/auth/domain/services/AccessTokenProviderService.ts";
import type { AccessTokenPayloadDTO } from "../../dtos/access-token-dto.ts";

export class AccessTokenServiceMock implements AccessTokenProviderService {
	generateAccessToken(payload: AccessTokenPayloadDTO): string {
		return JSON.stringify(payload);
	}
}
