import { GetDisciplinesUseCase } from "../../application/use-cases/get-disciplines-use-case.ts";
import { PrismaDisciplinesRepository } from "../database/prisma/prisma-disciplines-repository.ts";

export function makeGetDisciplineUseCase() {
	const disciplineRepository = new PrismaDisciplinesRepository();
	const getDisciplineUseCase = new GetDisciplinesUseCase(disciplineRepository);

	return getDisciplineUseCase;
}
