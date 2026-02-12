import type {
	ICreateTeacherDTO,
	IQueryTeacherDTO,
} from "@/modules/teacher/application/dtos/teacher-dto.ts";
import { TeacherMapper } from "@/modules/teacher/application/mappers/teacher-mapper.ts";
import type { ITeachersRepository } from "@/modules/teacher/domain/repositories/teachers-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaTeachersRepository implements ITeachersRepository {
	async findById(id: string) {
		const user = await prisma.teacher.findUnique({
			where: {
				id,
			},
		});

		if (!user) return null;

		return TeacherMapper.toDomain(user);
	}
	async findTeachers(query: IQueryTeacherDTO) {
		const take = query.limit;
		const skip = (query.page - 1) * take;
		const teachers = await prisma.teacher.findMany({
			include: { membership: { include: { user: true } } },
			where: {
				membership: {
					user: {
						OR: [
							{ name: { contains: query.name, mode: "insensitive" } },
							{ email: { contains: query.email, mode: "insensitive" } },
						],
					},
				},
			},
			take,
			skip,
			orderBy: { membership: { user: { name: "asc" } } },
		});

		if (!teachers) return null;

		return TeacherMapper.toManyQueryDTOV2(teachers);
	}
	async create(data: ICreateTeacherDTO) {
		const user = await prisma.teacher.create({
			data: TeacherMapper.toPrisma(data),
		});

		return TeacherMapper.toDomain(user);
	}
	async delete(id: string) {
		await prisma.teacher.delete({
			where: { id },
		});
	}
}
