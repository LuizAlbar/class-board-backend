import { UpdateDisciplineUseCase } from "../../application/use-cases/update-discipline-use-case.ts";
import { PrismaDisciplinesRepository } from "../database/prisma/prisma-disciplines-repository.ts";

export function makeUpdateDisciplineUseCase() {
	const disciplineRepository = new PrismaDisciplinesRepository();
	const updateDisciplineUseCase = new UpdateDisciplineUseCase(
		disciplineRepository,
	);

	return updateDisciplineUseCase;
}
