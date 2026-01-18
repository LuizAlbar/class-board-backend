import type { RefreshToken } from "../entities/RefreshToken.ts";
import type { UserRole } from "../entities/User.ts";

export interface RefreshTokenRepository {
	generate(userId: string, userRole: UserRole): Promise<RefreshToken>;
	findById(id: string): Promise<RefreshToken | null>;
	deleteByUserId(userId: string): Promise<void>;
}
