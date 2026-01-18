import type { FastifyInstance } from "fastify";
import type { TokenSignatureService } from "../../domain/services/TokenSignatureService.ts";

export class FastifyTokenSignatureService implements TokenSignatureService {
	constructor(private app: FastifyInstance) {}

	unsign(signedValue: string) {
		const { valid, value } = this.app.unsignCookie(signedValue);
		
		return { valid, value };
	}
}
