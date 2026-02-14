import type {
	ICreateTeacherAssignmentDTO,
	IUpdateTeacherAssignmentDTO,
} from "@/modules/teacher-assignment/application/dtos/teacher-assignment-dto.ts";
import { TeacherAssignmentMapper } from "@/modules/teacher-assignment/application/mappers/teacher-assignment-mapper.ts";
import type { ITeacherAssignmentsRepository } from "@/modules/teacher-assignment/domain/repositories/teacher-assignment-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaTeacherAssignmentsRepository
	implements ITeacherAssignmentsRepository
{
	async findById(id: string) {
		const teacherAssignmentItem = await prisma.teacherAssignment.findUnique({
			where: { id },
		});

		if (!teacherAssignmentItem) return null;

		return TeacherAssignmentMapper.toDomain(teacherAssignmentItem);
	}
	async create(data: ICreateTeacherAssignmentDTO) {
		const teacherAssignmentItem = await prisma.teacherAssignment.create({
			data: TeacherAssignmentMapper.toPrisma(data),
		});

		return TeacherAssignmentMapper.toDomain(teacherAssignmentItem);
	}
	async update(id: string, data: IUpdateTeacherAssignmentDTO) {
		const updatedTeacherAssignment = await prisma.teacherAssignment.update({
			where: { id },
			data: {
				...data,
			},
		});

		return TeacherAssignmentMapper.toDomain(updatedTeacherAssignment);
	}
	async delete(id: string) {
		await prisma.teacherAssignment.delete({
			where: { id },
		});
	}
}
