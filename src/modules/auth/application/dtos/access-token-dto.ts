import type { Role } from "@/modules/membership/domain/entities/membership-entity.ts";

export interface IAccessTokenPayloadDTO {
	sub: {
		id: string;
		orgId?: string;
		role?: Role;
	};
}
