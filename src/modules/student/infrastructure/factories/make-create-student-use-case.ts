import { CreateStudentUseCase } from "../../application/use-cases/create-student-use-case.ts";
import { PrismaStudentsRepository } from "../database/prisma/prisma-students-repository.ts";

export function makeCreateStudentUseCase() {
	const prismaStudentRepository = new PrismaStudentsRepository();

	const createStudentUseCase = new CreateStudentUseCase(
		prismaStudentRepository,
	);

	return createStudentUseCase;
}
