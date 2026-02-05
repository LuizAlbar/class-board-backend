import { CreateClassUseCase } from "../../application/use-cases/create-class-use-case.ts";
import { PrismaClassesRepository } from "../database/prisma/prisma-classes-repository.ts";

export function makeCreateClassUseCase() {
	const classesRepository = new PrismaClassesRepository();
	const createClassUseCase = new CreateClassUseCase(classesRepository);

	return createClassUseCase;
}
