import type { RefreshToken } from "../entities/RefreshToken.ts";

export interface RefreshTokenRepository {
	generate(userId: string): Promise<RefreshToken>;
	findById(id: string): Promise<RefreshToken | null>;
	deleteByUserId(userId: string): Promise<void>;
}
