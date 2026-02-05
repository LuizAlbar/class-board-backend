import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Period } from "../../domain/entities/class-entity.ts";
import { InMemoryClassesRepository } from "../../domain/repositories/in-memory/in-memory-classes-repository.ts";
import type { ICreateClassDTO } from "../dtos/class-dto.ts";
import { UpdateClassUseCase } from "./update-class-use-case.ts";

let classesRepository: InMemoryClassesRepository;
let sut: UpdateClassUseCase;

const coordinatorData = {
	role: Role.COORDENADOR,
	userId: "123",
	organizationId: "12345",
};

const professorData = {
	role: Role.PROFESSOR,
	userId: "123",
	organizationId: "12345",
};

const classData: ICreateClassDTO = {
	name: "Turma 1",
	period: Period.MANHA,
	organizationId: "12345",
	year: 2023,
};
describe("Create Membership Use Case", () => {
	beforeEach(() => {
		classesRepository = new InMemoryClassesRepository();
		sut = new UpdateClassUseCase(classesRepository);
	});

	it("should be able for a coordinator to update a class", async () => {
		const createdClass = await classesRepository.create(classData);

		const updatedClass = await sut.execute(
			{
				id: createdClass.id,
				name: "Turma 2",
			},
			UserContextMapper.toModel(coordinatorData),
		);

		const getUpdatedClass = await classesRepository.findById(createdClass.id);

		expect(getUpdatedClass?.name).toEqual(updatedClass.classItem.name);
	});

	it("should not be able for a non-coordinator to update a class", async () => {
		await expect(
			async () =>
				await sut.execute(
					{ id: "123", name: "Turma 2" },
					UserContextMapper.toModel(professorData),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
