import { RefreshToken } from "../../domain/entities/RefreshToken.ts";

export class RedisTokenMapper {
	static toPersistance(refreshToken: RefreshToken) {
		const data = {
			id: refreshToken.id,
			userId: refreshToken.userId,
			token: refreshToken.token,
			expiresAt: refreshToken.expiresAt,
		};

		return JSON.stringify(data);
	}

	static toDomain(raw: string): RefreshToken {
		const data = JSON.parse(raw);

		return new RefreshToken({
			id: data.id,
			userId: data.userId,
			token: data.token,
			expiresAt: data.expiresAt,
		});
	}
}
