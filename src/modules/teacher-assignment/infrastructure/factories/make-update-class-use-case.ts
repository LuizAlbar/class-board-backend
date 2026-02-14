import { UpdateTeacherAssignmentUseCase } from "../../application/use-cases/update-teacher-assignment-use-case.ts";
import { PrismaTeacherAssignmentsRepository } from "../database/prisma/prisma-teacher-assignments-repository.ts";

export function makeUpdateTeacherAssignmentUseCase() {
	const teacherAssignmentsRepository = new PrismaTeacherAssignmentsRepository();
	const updateTeacherAssignmentUseCase = new UpdateTeacherAssignmentUseCase(
		teacherAssignmentsRepository,
	);

	return updateTeacherAssignmentUseCase;
}
