import { UpdateClassUseCase } from "../../application/use-cases/update-class-use-case.ts";
import { PrismaClassesRepository } from "../database/prisma/prisma-classes-repository.ts";

export function makeUpdateClassUseCase() {
	const classesRepository = new PrismaClassesRepository();
	const updateClassUseCase = new UpdateClassUseCase(classesRepository);

	return updateClassUseCase;
}
