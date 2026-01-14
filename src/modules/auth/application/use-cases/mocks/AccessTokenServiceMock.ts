import { AccessTokenProviderService } from "@/modules/auth/domain/services/AccessTokenProviderService.ts";
import { AccessTokenPayloadDTO } from "../../dtos/access-token.ts";

export class AccessTokenServiceMock implements AccessTokenProviderService {
    generateAccessToken(payload: AccessTokenPayloadDTO): string {
        return JSON.stringify(payload)
    }

}