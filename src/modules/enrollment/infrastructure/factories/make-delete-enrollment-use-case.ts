import { DeleteEnrollmentUseCase } from "../../application/use-cases/delete-enrollment-use-case.ts";
import { PrismaEnrollmentsRepository } from "../database/prisma/prisma-enrollments-repository.ts";

export function makeDeleteEnrollmentUseCase() {
	const prismaEnrollmentRepository = new PrismaEnrollmentsRepository();

	const deleteEnrollmentUseCase = new DeleteEnrollmentUseCase(
		prismaEnrollmentRepository,
	);

	return deleteEnrollmentUseCase;
}
