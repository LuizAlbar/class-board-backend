import type { CreateUserDTO } from "@/modules/auth/application/dtos/user-dtos.ts";
import { UserMapper } from "@/modules/auth/application/mappers/user-mapper.ts";
import type { User } from "@/modules/auth/domain/entities/User.ts";
import type { UsersRepository } from "@/modules/auth/domain/repositories/users-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaUserRepository implements UsersRepository {
	async findById(id: string) {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}
	async create(data: CreateUserDTO) {
		const user = await prisma.user.create({
			data: UserMapper.toPrisma(data),
		});

		return UserMapper.toDomain(user);
	}
	async update(data: User) {
		const user = await prisma.user.update({
			where: { id: data.id },
			data: UserMapper.toPrisma(data),
		});

		return UserMapper.toDomain(user);
	}
	async delete(id: string) {
		await prisma.user.delete({ where: { id: id } });
	}
}
