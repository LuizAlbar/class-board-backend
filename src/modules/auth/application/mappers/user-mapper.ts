import type { User } from "../../domain/entities/User.ts";
import type { UserDto } from "../dtos/user-dtos.ts";

export class UserMapper {
	static toDTO(user: User): UserDto {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};
	}
}
