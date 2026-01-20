import { randomUUID } from "node:crypto";
import { RedisTokenMapper } from "@/modules/auth/application/mappers/redis-token-mapper.ts";
import { RefreshToken } from "@/modules/auth/domain/entities/refresh-token-entity.ts";
import type { IRefreshTokenRepository } from "@/modules/auth/domain/repositories/refresh-tokens-repository.ts";
import { redis } from "@/shared/database/redis.ts";

export class RedisRefreshTokenRepository implements IRefreshTokenRepository {
	async generate(userId: string): Promise<RefreshToken> {
		const actualDayPlusSeven = new Date();
		actualDayPlusSeven.setDate(new Date().getDate() + 7);
		const ttl = 60 * 60 * 24 * 7;

		const newToken = new RefreshToken({
			id: randomUUID(),
			userId: userId,
			token: randomUUID(),
			expiresAt: actualDayPlusSeven,
		});

		const userSet = `user:${userId}:tokens`;
		const token = `refreshToken:${newToken.token}`;

		await redis.set(token, RedisTokenMapper.toPersistance(newToken), "EX", ttl);

		await redis.sadd(userSet, newToken.token);
		await redis.expire(userSet, ttl);

		return newToken;
	}
	async findById(id: string): Promise<RefreshToken | null> {
		const token = await redis.get(`refreshToken:${id}`);

		if (!token) {
			return null;
		}

		return RedisTokenMapper.toDomain(token);
	}
	async deleteByUserId(userId: string) {
		const userSet = `user:${userId}:tokens`;

		const userTokens = await redis.smembers(userSet);

		if (userTokens.length > 0) {
			const tokenKeys = userTokens.map((t) => `refreshToken:${t}`);
			await redis.del(...tokenKeys);
		}

		await redis.del(userSet);
	}
}
