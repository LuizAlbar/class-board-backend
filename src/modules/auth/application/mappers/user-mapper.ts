import type { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entities/user-entity.ts";
import type { ICreateUserDTO, IUserDto } from "../dtos/user-dto.ts";

export class UserMapper {
	static toDomain(raw: PrismaUser): User {
		return new User({
			id: raw.id,
			name: raw.name,
			email: raw.email,
			password: raw.password,
			created_at: raw.created_at,
			updated_at: raw.updated_at,
		});
	}

	static toPrisma(data: ICreateUserDTO) {
		return {
			name: data.name,
			email: data.email,
			password: data.password,
		};
	}

	static toDTO(user: User): IUserDto {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};
	}
}
