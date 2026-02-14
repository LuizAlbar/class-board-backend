import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryTeacherAssignmentsRepository } from "../../domain/repositories/in-memory/in-memory-teacher-assignments-repository.ts";
import type { ICreateTeacherAssignmentDTO } from "../dtos/teacher-assignment-dto.ts";
import { CreateTeacherAssignmentUseCase } from "./create-teacher-assignment-use-case.ts";

let teacherAssignmentsRepository: InMemoryTeacherAssignmentsRepository;
let sut: CreateTeacherAssignmentUseCase;

const teacherAssignmentData: ICreateTeacherAssignmentDTO = {
	workload: 60,
	classId: "class-1",
	teacherId: "teacher-1",
	disciplineId: "discipline-1",
};
describe("Create Teacher Assignment Use Case", () => {
	beforeEach(() => {
		teacherAssignmentsRepository = new InMemoryTeacherAssignmentsRepository();
		sut = new CreateTeacherAssignmentUseCase(teacherAssignmentsRepository);
	});

	it("should be able for a authorized user to create a teacher assignment", async () => {
		const { teacherAssignmentItem } = await sut.execute(
			teacherAssignmentData,
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		expect(teacherAssignmentItem.classId).toEqual(
			teacherAssignmentData.classId,
		);
	});

	it("should not be able to create teacher assignment without permission", async () => {
		await expect(
			async () =>
				await sut.execute(
					teacherAssignmentData,
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
