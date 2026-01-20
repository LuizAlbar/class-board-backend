import type { FastifyInstance } from "fastify";
import type { IAccessTokenPayloadDTO } from "../../application/dtos/access-token-dto.ts";
import type { IAccessTokenProviderService } from "../../domain/services/access-token-provider-service.ts";

export class FastifyJWTProvider implements IAccessTokenProviderService {
	constructor(private app: FastifyInstance) {}
	generateAccessToken(payload: IAccessTokenPayloadDTO) {
		return this.app.jwt.sign(payload, { expiresIn: "15m" });
	}
}
