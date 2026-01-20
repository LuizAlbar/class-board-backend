import type { ITokenSignatureService } from "@/modules/auth/domain/services/token-signature-service.ts";

export class TokenSignatureServiceMock implements ITokenSignatureService {
	unsign(signedValue: string): { valid: boolean; value: string | null } {
		if (!signedValue) {
			throw new Error("No token");
		}

		return { valid: true, value: signedValue };
	}
}
