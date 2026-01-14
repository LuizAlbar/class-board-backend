import { randomUUID } from "node:crypto";
import { RefreshToken } from "../../entities/RefreshToken.ts";
import type { RefreshTokenRepository } from "../refresh-token-repository.ts";

export class InMemoryTokensRepository implements RefreshTokenRepository {
	public items: RefreshToken[] = [];

	async generate(userId: string) {
		const actualDayPlusSeven = new Date();

		actualDayPlusSeven.setDate(new Date().getDate() + 7);

		const token = new RefreshToken({
			id: randomUUID(),
			token: userId + randomUUID(),
			userId: userId,
			expiresAt: actualDayPlusSeven,
		});

		this.items.push(token);

		return token;
	}
	async findById(userId: string) {
		const token = this.items.find((item) => item.userId === userId);

		if (!token) {
			return null;
		}

		return token;
	}
	async deleteByUserId(userId: string) {
		this.items = this.items.filter((item) => item.userId !== userId);
	}
}
