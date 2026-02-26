import { UpdateEnrollmentUseCase } from "../../application/use-cases/update-enrollment-use-case.ts";
import { PrismaEnrollmentsRepository } from "../database/prisma/prisma-enrollments-repository.ts";

export function makeUpdateEnrollmentUseCase() {
	const teacherAssignmentsRepository = new PrismaEnrollmentsRepository();
	const updateEnrollmentUseCase = new UpdateEnrollmentUseCase(
		teacherAssignmentsRepository,
	);

	return updateEnrollmentUseCase;
}
