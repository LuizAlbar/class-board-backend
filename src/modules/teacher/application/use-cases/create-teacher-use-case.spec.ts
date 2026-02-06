import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { InMemoryTeachersRepository } from "../../domain/repositories/in-memory/in-memory-teachers-repository.ts";
import type { ICreateTeacherDTO } from "../dtos/teacher-dto.ts";
import { CreateTeacherUseCase } from "./create-teacher-use-case.ts";

let teachersRepository: InMemoryTeachersRepository;
let sut: CreateTeacherUseCase;

const teacherData: ICreateTeacherDTO = {
	userId: "123",
	organizationId: "123",
};

describe("Create Teacher Use Case", () => {
	beforeEach(() => {
		teachersRepository = new InMemoryTeachersRepository();
		sut = new CreateTeacherUseCase(teachersRepository);
	});

	it("should be able for a coordinator to create a teacher", async () => {
		const coordinator = createUserContext(Role.COORDENADOR);
		const { teacherItem } = await sut.execute(
			teacherData,
			UserContextMapper.toModel(coordinator),
		);

		expect(teacherItem.userId).toEqual(teacherData.userId);
	});

	it("should not be able for a non-coordinator to create a teacher", async () => {
		await expect(() =>
			sut.execute(
				teacherData,
				UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
			),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
