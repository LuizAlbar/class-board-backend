import { CreateEnrollmentUseCase } from "../../application/use-cases/create-enrollment-use-case.ts";
import { PrismaEnrollmentsRepository } from "../database/prisma/prisma-enrollments-repository.ts";

export function makeCreateEnrollmentUseCase() {
	const prismaEnrollmentRepository = new PrismaEnrollmentsRepository();

	const createEnrollmentUseCase = new CreateEnrollmentUseCase(
		prismaEnrollmentRepository,
	);

	return createEnrollmentUseCase;
}
