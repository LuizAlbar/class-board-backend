export interface TokenSignatureService {
	unsign(signedValue: string): {
		valid: boolean;
		value: string | null;
	};
}
