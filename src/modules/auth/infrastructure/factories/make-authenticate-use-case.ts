import type { FastifyInstance } from "fastify";
import { AuthenticateUseCase } from "../../application/use-cases/authenticate.ts";
import { BcryptHashService } from "../config/bcrypt.ts";
import { FastifyJWTProvider } from "../config/fastify-jwt.ts";
import { PrismaUserRepository } from "../database/repositories/prisma/prisma-users-repository.ts";
import { RedisRefreshTokenRepository } from "../database/repositories/redis/redis-refresh-token-repository.ts";

export function makeAuthenticateUseCase(appInstance: FastifyInstance) {
	const prismaUserRepository = new PrismaUserRepository();
	const refreshTokenRepository = new RedisRefreshTokenRepository();
	const accessTokenService = new FastifyJWTProvider(appInstance);
	const hashService = new BcryptHashService();

	const authenticateUseCase = new AuthenticateUseCase(
		prismaUserRepository,
		refreshTokenRepository,
		accessTokenService,
		hashService,
	);

	return authenticateUseCase;
}
