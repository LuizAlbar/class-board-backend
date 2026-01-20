import { randomUUID } from "node:crypto";
import { RefreshToken } from "../../entities/refresh-token-entity.ts";
import type { IRefreshTokenRepository } from "../refresh-tokens-repository.ts";

export class InMemoryTokensRepository implements IRefreshTokenRepository {
	public items: RefreshToken[] = [];

	async generate(userId: string) {
		const actualDayPlusSeven = new Date();

		actualDayPlusSeven.setDate(new Date().getDate() + 7);

		const token = new RefreshToken({
			id: randomUUID(),
			userId: userId,
			token: userId + randomUUID(),
			expiresAt: actualDayPlusSeven,
		});

		this.items.push(token);

		return token;
	}
	async findById(id: string) {
		const token = this.items.find((item) => item.token === id);

		if (!token) {
			return null;
		}

		return token;
	}
	async deleteByUserId(userId: string) {
		this.items = this.items.filter((item) => item.userId !== userId);
	}
}
