import { GetTeachersUseCase } from "../../application/use-cases/get-teachers-use-case.ts";
import { PrismaTeachersRepository } from "../database/prisma/prisma-teachers-repository.ts";

export function makeGetTeacherUseCase() {
	const prismaTeacherRepository = new PrismaTeachersRepository();

	const getTeacherUseCase = new GetTeachersUseCase(prismaTeacherRepository);

	return getTeacherUseCase;
}
