import type { RefreshToken } from "../entities/refresh-token-entity.ts";

export interface IRefreshTokenRepository {
	generate(userId: string): Promise<RefreshToken>;
	findById(id: string): Promise<RefreshToken | null>;
	deleteByUserId(userId: string): Promise<void>;
}
