import type { Role } from "@/modules/membership/domain/entities/Membership.ts";
import "@fastify/jwt";

declare module "@fastify/jwt" {
	export interface FastifyJWT {
		user: {
			sub: {
				id: string;
				orgId?: string;
				role?: Role;
			};
		};
	}
}
