import type { CreateUserDTO } from "@/modules/auth/application/dtos/user-dtos.ts";
import { PrismaUserMapper } from "@/modules/auth/application/mappers/prisma-user-mapper.ts";
import { prisma } from "@/shared/database/prisma.ts";
import type { User } from "@/modules/auth/domain/entities/User.ts";
import type { UsersRepository } from "@/modules/auth/domain/repositories/users-repository.ts";

export class PrismaUserRepository implements UsersRepository {
	async findById(id: string) {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}
	async create(data: CreateUserDTO) {
		const user = await prisma.user.create({
			data: PrismaUserMapper.toPrisma(data),
		});

		return PrismaUserMapper.toDomain(user);
	}
	async update(data: User) {
		const user = await prisma.user.update({
			where: { id: data.id },
			data: PrismaUserMapper.toPrisma(data),
		});

		return PrismaUserMapper.toDomain(user);
	}
	async delete(id: string) {
		await prisma.user.delete({ where: { id: id } });
	}
}
