import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryDisciplinesRepository } from "../../domain/repositories/in-memory/in-memory-disciplines-repository.ts";
import type { ICreateDisciplineDTO } from "../dtos/discipline-dto.ts";
import { UpdateDisciplineUseCase } from "./update-discipline-use-case.ts";

let disciplinesRepository: InMemoryDisciplinesRepository;
let sut: UpdateDisciplineUseCase;

const disciplineData: ICreateDisciplineDTO = {
	name: "POO",
	description: "Programação Orientada a Objetos",
};
describe("Create Membership Use Case", () => {
	beforeEach(() => {
		disciplinesRepository = new InMemoryDisciplinesRepository();
		sut = new UpdateDisciplineUseCase(disciplinesRepository);
	});

	it("should be able for a coordinator to update a discipline", async () => {
		const createdDiscipline =
			await disciplinesRepository.create(disciplineData);

		const updatedDiscipline = await sut.execute(
			{
				id: createdDiscipline.id,
				name: "Programar em Linguagem Estruturada",
			},
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		const getUpdatedClass = await disciplinesRepository.findById(
			createdDiscipline.id,
		);

		expect(getUpdatedClass?.name).toEqual(
			updatedDiscipline.disciplineItem.name,
		);
	});

	it("should not be able for a non-coordinator to update a discipline", async () => {
		await expect(
			async () =>
				await sut.execute(
					{ id: "123", name: "Programar em Linguagem Estruturada" },
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
