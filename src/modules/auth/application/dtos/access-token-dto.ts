import type { UserRole } from "../../domain/entities/User.ts";

export interface AccessTokenPayloadDTO {
	sub: {
		id: string;
		role: UserRole;
	};
}
