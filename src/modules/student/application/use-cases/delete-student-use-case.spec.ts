import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryStudentsRepository } from "../../domain/repositories/in-memory/in-memory-students-repository.ts";
import type {
	ICreateStudentDTO,
	IDeleteStudentDTO,
} from "../dtos/student-dto.ts";
import { DeleteStudentUseCase } from "./delete-student-use-case.ts";

let studentsRepository: InMemoryStudentsRepository;
let sut: DeleteStudentUseCase;

const studentData: ICreateStudentDTO = {
	userId: "123",
	ra: "123",
	dateOfBirth: new Date("2000-01-01"),
	organizationId: "123",
};
describe("Delete Student Use Case", () => {
	beforeEach(() => {
		studentsRepository = new InMemoryStudentsRepository();
		sut = new DeleteStudentUseCase(studentsRepository);
	});

	it("should be able for a coordinator to delete a student", async () => {
		const createdStudent: IDeleteStudentDTO =
			await studentsRepository.create(studentData);

		await sut.execute(
			createdStudent,
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		const deletedStudent = await studentsRepository.findById(createdStudent.id);

		expect(deletedStudent).toBeNull();
	});

	it("should not be able for a non-coordinator to delete a student", async () => {
		const createdStudent: IDeleteStudentDTO =
			await studentsRepository.create(studentData);

		await expect(
			async () =>
				await sut.execute(
					createdStudent,
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
