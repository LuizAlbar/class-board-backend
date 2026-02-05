import { DeleteDisciplineUseCase } from "../../application/use-cases/delete-discipline-use-case.ts";
import { PrismaDisciplinesRepository } from "../database/prisma/prisma-disciplines-repository.ts";

export function makeDeleteDisciplineUseCase() {
	const disciplineRepository = new PrismaDisciplinesRepository();
	const deleteDisciplineUseCase = new DeleteDisciplineUseCase(
		disciplineRepository,
	);

	return deleteDisciplineUseCase;
}
