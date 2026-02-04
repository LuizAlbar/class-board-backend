import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Period } from "../../domain/entities/class-entity.ts";
import { InMemoryClassesRepository } from "../../domain/repositories/in-memory/in-memory-classes-repository.ts";
import type { ICreateClassDTO } from "../dtos/class-dto.ts";
import { CreateClassUseCase } from "./create-class-use-case.ts";

let classesRepository: InMemoryClassesRepository;
let sut: CreateClassUseCase;

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
	year: 2023,
};
describe("Create Membership Use Case", () => {
	beforeEach(() => {
		classesRepository = new InMemoryClassesRepository();
		sut = new CreateClassUseCase(classesRepository);
	});

	it("should be able for a coordinator to create a class", async () => {
		const { classItem } = await sut.execute(
			classData,
			UserContextMapper.toModel(coordinatorData),
		);

		expect(classItem.name).toEqual(classData.name);
		expect(classItem.id).toEqual(expect.any(String));
	});

	it("should not be able for a non-coordinator to create a class", async () => {
		expect(
			async () =>
				await sut.execute(classData, UserContextMapper.toModel(professorData)),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
