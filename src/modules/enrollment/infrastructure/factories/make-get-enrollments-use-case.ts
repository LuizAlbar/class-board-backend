import { GetEnrollmentsUseCase } from "../../application/use-cases/get-enrollments-use-case.ts";
import { PrismaEnrollmentsRepository } from "../database/prisma/prisma-enrollments-repository.ts";

export function makeGetEnrollmentUseCase() {
	const prismaEnrollmentRepository = new PrismaEnrollmentsRepository();

	const getEnrollmentUseCase = new GetEnrollmentsUseCase(
		prismaEnrollmentRepository,
	);

	return getEnrollmentUseCase;
}
