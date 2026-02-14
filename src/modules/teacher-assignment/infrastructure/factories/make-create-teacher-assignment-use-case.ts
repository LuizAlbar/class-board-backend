import { CreateTeacherAssignmentUseCase } from "../../application/use-cases/create-teacher-assignment-use-case.ts";
import { PrismaTeacherAssignmentsRepository } from "../database/prisma/prisma-teacher-assignments-repository.ts";

export function makeCreateTeacherAssignmentUseCase() {
	const teacherAssignmentsRepository = new PrismaTeacherAssignmentsRepository();
	const createTeacherAssignmentUseCase = new CreateTeacherAssignmentUseCase(
		teacherAssignmentsRepository,
	);

	return createTeacherAssignmentUseCase;
}
