import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryDisciplinesRepository } from "../../domain/repositories/in-memory/in-memory-disciplines-repository.ts";
import type {
	ICreateDisciplineDTO,
	IDeleteDisciplineDTO,
} from "../dtos/discipline-dto.ts";
import { DeleteDisciplineUseCase } from "./delete-discipline-use-case.ts";

let disciplinesRepository: InMemoryDisciplinesRepository;
let sut: DeleteDisciplineUseCase;

const disciplineData: ICreateDisciplineDTO = {
	name: "POO",
	description: "Programação Orientada a Objetos",
	organizationId: "123",
};
describe("Delete Discipline Use Case", () => {
	beforeEach(() => {
		disciplinesRepository = new InMemoryDisciplinesRepository();
		sut = new DeleteDisciplineUseCase(disciplinesRepository);
	});

	it("should be able for a coordinator to delete a discipline", async () => {
		const createdDiscipline: IDeleteDisciplineDTO =
			await disciplinesRepository.create(disciplineData);

		await sut.execute(
			createdDiscipline,
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		const deletedDiscipline = await disciplinesRepository.findById(
			createdDiscipline.id,
		);

		expect(deletedDiscipline).toBeNull();
	});

	it("should not be able for a non-coordinator to delete a discipline", async () => {
		const createdDiscipline: IDeleteDisciplineDTO =
			await disciplinesRepository.create(disciplineData);

		await expect(
			async () =>
				await sut.execute(
					createdDiscipline,
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
