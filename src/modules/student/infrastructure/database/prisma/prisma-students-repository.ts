import type {
	ICreateStudentDTO,
	IQueryStudentDTO,
} from "@/modules/student/application/dtos/student-dto.ts";
import { StudentMapper } from "@/modules/student/application/mappers/student-mapper.ts";
import type { IStudentsRepository } from "@/modules/student/domain/repositories/students-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaStudentsRepository implements IStudentsRepository {
	async findById(id: string) {
		const user = await prisma.student.findUnique({
			where: {
				id,
			},
		});

		if (!user) return null;

		return StudentMapper.toDomain(user);
	}
	async findStudents(query: IQueryStudentDTO) {
		const take = query.limit;
		const skip = (query.page - 1) * take;
		const students = await prisma.student.findMany({
			include: { membership: { include: { user: true } } },
			where: {
				OR: [
					{ ra: { contains: query.ra, mode: "insensitive" } },

					{
						membership: {
							user: {
								OR: [
									{ name: { contains: query.name, mode: "insensitive" } },
									{ email: { contains: query.email, mode: "insensitive" } },
								],
							},
						},
					},
				],
			},
			take,
			skip,
			orderBy: { membership: { user: { name: "asc" } } },
		});

		if (!students) return null;

		return StudentMapper.toManyQueryDTOV2(students);
	}
	async create(data: ICreateStudentDTO) {
		const user = await prisma.student.create({
			data: StudentMapper.toPrisma(data),
		});

		return StudentMapper.toDomain(user);
	}
	async delete(id: string) {
		await prisma.student.delete({
			where: { id },
		});
	}
}
