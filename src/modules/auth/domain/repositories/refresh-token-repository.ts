import type { RefreshToken } from "../entities/RefreshToken.ts";
import { CreateRefreshTokenDTO } from "../../application/dtos/refresh-token.ts";

export interface RefreshTokenRepository {
	generate(refreshToken: CreateRefreshTokenDTO): Promise<RefreshToken>;
	findById(id: string): Promise<RefreshToken | null>;
	deleteByUserId(userId: string): Promise<void>;
}
