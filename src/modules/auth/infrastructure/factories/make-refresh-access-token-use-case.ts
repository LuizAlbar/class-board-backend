import type { FastifyInstance } from "fastify";
import { RefreshAccessTokenUseCase } from "../../application/use-cases/refresh-access-token.ts";
import { FastifyJWTProvider } from "../config/fastify-jwt.ts";
import { FastifyTokenSignatureService } from "../config/fastify-token.ts";
import { RedisRefreshTokenRepository } from "../database/repositories/redis/redis-refresh-token-repository.ts";

export function MakeRefreshAccessTokenUseCase(appInstance: FastifyInstance) {
	const redisRefreshTokenRepository = new RedisRefreshTokenRepository();
	const fastifyTokenSignatureService = new FastifyTokenSignatureService(
		appInstance,
	);
	const fastifyJWTProvider = new FastifyJWTProvider(appInstance);

	const refreshTokenUseCase = new RefreshAccessTokenUseCase(
		redisRefreshTokenRepository,
		fastifyTokenSignatureService,
		fastifyJWTProvider,
	);

	return refreshTokenUseCase;
}
