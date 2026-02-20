import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryStudentsRepository } from "../../domain/repositories/in-memory/in-memory-students-repository.ts";
import type { ICreateStudentDTO } from "../dtos/student-dto.ts";
import { CreateStudentUseCase } from "./create-student-use-case.ts";

let studentsRepository: InMemoryStudentsRepository;
let sut: CreateStudentUseCase;

const studentData: ICreateStudentDTO = {
	userId: "123",
	ra: "123",
	dateOfBirth: new Date("2000-01-01"),
	organizationId: "123",
};

describe("Create Student Use Case", () => {
	beforeEach(() => {
		studentsRepository = new InMemoryStudentsRepository();
		sut = new CreateStudentUseCase(studentsRepository);
	});

	it("should be able for a coordinator to create a student", async () => {
		const coordinator = createUserContext(Role.COORDENADOR);
		const { studentItem } = await sut.execute(
			studentData,
			UserContextMapper.toModel(coordinator),
		);

		expect(studentItem.userId).toEqual(studentData.userId);
	});

	it("should not be able for a non-coordinator to create a student", async () => {
		await expect(() =>
			sut.execute(
				studentData,
				UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
			),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
