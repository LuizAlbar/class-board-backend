import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryTeacherAssignmentsRepository } from "../../domain/repositories/in-memory/in-memory-teacher-assignments-repository.ts";
import type { ICreateTeacherAssignmentDTO } from "../dtos/teacher-assignment-dto.ts";
import { UpdateTeacherAssignmentUseCase } from "./update-teacher-assignment-use-case.ts";

let teacherAssignmentsRepository: InMemoryTeacherAssignmentsRepository;
let sut: UpdateTeacherAssignmentUseCase;

const teacherAssignmentData: ICreateTeacherAssignmentDTO = {
	workload: 60,
	teacherId: "teacher-1",
	classId: "class-1",
	disciplineId: "discipline-1",
};
describe("Update Teacher Assignment Use Case", () => {
	beforeEach(() => {
		teacherAssignmentsRepository = new InMemoryTeacherAssignmentsRepository();
		sut = new UpdateTeacherAssignmentUseCase(teacherAssignmentsRepository);
	});

	it("should be able for a authorized user to update a teacher assignment", async () => {
		const createdTeacherAssignment = await teacherAssignmentsRepository.create(
			teacherAssignmentData,
		);

		const updatedTeacherAssignment = await sut.execute(
			{
				id: createdTeacherAssignment.id,
				disciplineId: "discipline-2",
			},
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		const getUpdatedTeacherAssignment =
			await teacherAssignmentsRepository.findById(createdTeacherAssignment.id);

		expect(getUpdatedTeacherAssignment?.disciplineId).toEqual(
			updatedTeacherAssignment.teacherAssignmentItem.disciplineId,
		);
	});

	it("should not be able to update a teacher assignment without permission", async () => {
		await expect(
			async () =>
				await sut.execute(
					{ id: "123", disciplineId: "discipline-2" },
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
