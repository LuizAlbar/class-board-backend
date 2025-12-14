import type { User as PrismaUser } from "@prisma/client";
import { User, type UserRole } from "../../domain/entities/User.ts";
import type { CreateUserDTO } from "../dtos/user-dtos.ts";

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return new User({
			id: raw.id,
			name: raw.name,
			email: raw.email,
			password: raw.password,
			created_at: raw.created_at,
			updated_at: raw.updated_at,
			role: raw.role as UserRole,
		});
	}

	static toPrisma(data: CreateUserDTO) {
		return {
			name: data.name,
			email: data.email,
			password: data.password,
			role: data.role,
		};
	}
}
