import { DeleteStudentUseCase } from "../../application/use-cases/delete-student-use-case.ts";
import { PrismaStudentsRepository } from "../database/prisma/prisma-students-repository.ts";

export function makeDeleteStudentUseCase() {
	const prismaStudentRepository = new PrismaStudentsRepository();

	const deleteStudentUseCase = new DeleteStudentUseCase(
		prismaStudentRepository,
	);

	return deleteStudentUseCase;
}
