import type {
	ICreateClassDTO,
	IUpdateClassDTO,
} from "@/modules/class/application/dtos/class-dto.ts";
import { ClassMapper } from "@/modules/class/application/mappers/class-mapper.ts";
import type { IClassesRepository } from "@/modules/class/domain/repositories/class-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaClassesRepository implements IClassesRepository {
	async findById(id: string) {
		const classItem = await prisma.class.findUnique({
			where: { id },
		});

		if (!classItem) return null;

		return ClassMapper.toDomain(classItem);
	}
	async create(data: ICreateClassDTO) {
		const classItem = await prisma.class.create({
			data: ClassMapper.toPrisma(data),
		});

		return ClassMapper.toDomain(classItem);
	}
	async update(id: string, data: IUpdateClassDTO) {
		const updatedClass = await prisma.class.update({
			where: { id },
			data: {
				...data,
			},
		});

		return ClassMapper.toDomain(updatedClass);
	}
	async delete(id: string) {
		await prisma.class.delete({
			where: { id },
		});
	}
}
