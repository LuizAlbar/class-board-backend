import { UserRole } from "../../domain/entities/User.ts"

export interface AccessTokenPayloadDTO {
    sub: string
    role?: UserRole
}