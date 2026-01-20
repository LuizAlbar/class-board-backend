import type { FastifyInstance } from "fastify";
import type { ITokenSignatureService } from "../../domain/services/token-signature-service.ts";

export class FastifyTokenSignatureService implements ITokenSignatureService {
	constructor(private app: FastifyInstance) {}

	unsign(signedValue: string) {
		const { valid, value } = this.app.unsignCookie(signedValue);

		return { valid, value };
	}
}
