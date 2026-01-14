import { UserRole } from "@/modules/auth/domain/entities/User.ts"
import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            sub: string
            role: UserRole
        }
    }
}