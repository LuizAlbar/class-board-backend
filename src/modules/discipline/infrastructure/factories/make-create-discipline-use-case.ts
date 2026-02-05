import { CreateDisciplineUseCase } from "../../application/use-cases/create-discipline-use-case.ts";
import { PrismaDisciplinesRepository } from "../database/prisma/prisma-disciplines-repository.ts";

export function makeCreateDisciplineUseCase() {
	const disciplineRepository = new PrismaDisciplinesRepository();
	const createDisciplineUseCase = new CreateDisciplineUseCase(
		disciplineRepository,
	);

	return createDisciplineUseCase;
}
