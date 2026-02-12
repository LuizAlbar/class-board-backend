import { DeleteTeacherUseCase } from "../../application/use-cases/delete-teacher-use-case.ts";
import { PrismaTeachersRepository } from "../database/prisma/prisma-teachers-repository.ts";

export function makeDeleteTeacherUseCase() {
	const prismaTeacherRepository = new PrismaTeachersRepository();

	const deleteTeacherUseCase = new DeleteTeacherUseCase(
		prismaTeacherRepository,
	);

	return deleteTeacherUseCase;
}
