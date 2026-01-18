import type { UserRole } from "@/modules/auth/domain/entities/User.ts";
import "@fastify/jwt";

declare module "@fastify/jwt" {
	export interface FastifyJWT {
		user: {
			sub: {
				id: string;
				role: UserRole;
			};
		};
	}
}
