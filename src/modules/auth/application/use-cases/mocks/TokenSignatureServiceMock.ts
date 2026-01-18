import type { TokenSignatureService } from "@/modules/auth/domain/services/TokenSignatureService.ts";

export class TokenSignatureServiceMock implements TokenSignatureService {
	unsign(signedValue: string): { valid: boolean; value: string | null } {
		if (!signedValue) {
			throw new Error("No token");
		}

		return { valid: true, value: signedValue };
	}
}
