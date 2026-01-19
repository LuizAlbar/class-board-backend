import type { FastifyInstance } from "fastify";
import type { AccessTokenPayloadDTO } from "../../application/dtos/access-token.ts";
import type { AccessTokenProviderService } from "../../domain/services/AccessTokenProviderService.ts";

export class FastifyJWTProvider implements AccessTokenProviderService {
	constructor(private app: FastifyInstance) {}
	generateAccessToken(payload: AccessTokenPayloadDTO) {
		return this.app.jwt.sign(payload, { expiresIn: "15m" });
	}
}
