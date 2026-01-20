export interface ITokenSignatureService {
	unsign(signedValue: string): {
		valid: boolean;
		value: string | null;
	};
}
