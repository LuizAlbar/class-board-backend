import { GetStudentsUseCase } from "../../application/use-cases/get-students-use-case.ts";
import { PrismaStudentsRepository } from "../database/prisma/prisma-students-repository.ts";

export function makeGetStudentUseCase() {
	const prismaStudentRepository = new PrismaStudentsRepository();

	const getStudentUseCase = new GetStudentsUseCase(prismaStudentRepository);

	return getStudentUseCase;
}
