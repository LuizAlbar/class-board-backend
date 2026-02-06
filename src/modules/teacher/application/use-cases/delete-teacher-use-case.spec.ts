import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryTeachersRepository } from "../../domain/repositories/in-memory/in-memory-teachers-repository.ts";
import type {
	ICreateTeacherDTO,
	IDeleteTeacherDTO,
} from "../dtos/teacher-dto.ts";
import { DeleteTeacherUseCase } from "./delete-teacher-use-case.ts";

let teachersRepository: InMemoryTeachersRepository;
let sut: DeleteTeacherUseCase;

const teacherData: ICreateTeacherDTO = {
	userId: "123",
	organizationId: "123",
};
describe("Delete Teacher Use Case", () => {
	beforeEach(() => {
		teachersRepository = new InMemoryTeachersRepository();
		sut = new DeleteTeacherUseCase(teachersRepository);
	});

	it("should be able for a coordinator to delete a teacher", async () => {
		const createdTeacher: IDeleteTeacherDTO =
			await teachersRepository.create(teacherData);

		await sut.execute(
			createdTeacher,
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		const deletedTeacher = await teachersRepository.findById(createdTeacher.id);

		expect(deletedTeacher).toBeNull();
	});

	it("should not be able for a non-coordinator to delete a teacher", async () => {
		const createdTeacher: IDeleteTeacherDTO =
			await teachersRepository.create(teacherData);

		await expect(
			async () =>
				await sut.execute(
					createdTeacher,
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
