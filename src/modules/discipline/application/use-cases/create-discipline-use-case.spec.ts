import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryDisciplinesRepository } from "../../domain/repositories/in-memory/in-memory-disciplines-repository.ts";
import type { ICreateDisciplineDTO } from "../dtos/discipline-dto.ts";
import { CreateDisciplineUseCase } from "./create-discipline-use-case.ts";

let disciplinesRepository: InMemoryDisciplinesRepository;
let sut: CreateDisciplineUseCase;

const disciplineData: ICreateDisciplineDTO = {
	name: "POO",
	description: "Programação Orientada a Objetos",
	organizationId: "123",
};

describe("Create Discipline Use Case", () => {
	beforeEach(() => {
		disciplinesRepository = new InMemoryDisciplinesRepository();
		sut = new CreateDisciplineUseCase(disciplinesRepository);
	});

	it("should be able for a coordinator to create a discipline", async () => {
		const coordinator = createUserContext(Role.COORDENADOR);
		const { disciplineItem } = await sut.execute(
			disciplineData,
			UserContextMapper.toModel(coordinator),
		);

		expect(disciplineItem.name).toEqual(disciplineData.name);
	});

	it("should not be able for a non-coordinator to create a discipline", async () => {
		await expect(() =>
			sut.execute(
				disciplineData,
				UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
			),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
