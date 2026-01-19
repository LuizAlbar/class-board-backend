import type { Role } from "@/modules/membership/domain/entities/Membership.ts";

export interface AccessTokenPayloadDTO {
	sub: {
		id: string;
		orgId?: string;
		role?: Role;
	};
}
