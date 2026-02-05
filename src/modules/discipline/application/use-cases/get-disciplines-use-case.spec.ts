import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryDisciplinesRepository } from "../../domain/repositories/in-memory/in-memory-disciplines-repository.ts";
import type { ICreateDisciplineDTO } from "../dtos/discipline-dto.ts";
import { GetDisciplinesUseCase } from "./get-disciplines-use-case.ts";

let disciplinesRepository: InMemoryDisciplinesRepository;
let sut: GetDisciplinesUseCase;

const disciplineData: ICreateDisciplineDTO = {
	name: "POO",
	description: "Programação Orientada a Objetos",
};
describe("Get Discipline Use Case", () => {
	beforeEach(() => {
		disciplinesRepository = new InMemoryDisciplinesRepository();
		sut = new GetDisciplinesUseCase(disciplinesRepository);
	});

	it("should fetch disciplines with pagination", async () => {
		for (let i = 0; i < 12; i++) {
			await disciplinesRepository.create({
				...disciplineData,
			});
		}

		const disciplines = await sut.execute(
			{ page: 1, limit: 10 },
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		expect(disciplines.disciplinesItems).toHaveLength(10);
	});
});
