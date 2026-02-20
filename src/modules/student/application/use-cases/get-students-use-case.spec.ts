import { beforeEach, describe, expect, it } from "vitest";
import { User } from "@/modules/auth/domain/entities/user-entity.ts";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { Student } from "../../domain/entities/student-entity.ts";
import { InMemoryStudentsRepository } from "../../domain/repositories/in-memory/in-memory-students-repository.ts";
import { GetStudentsUseCase } from "./get-students-use-case.ts";

let studentsRepository: InMemoryStudentsRepository;
let sut: GetStudentsUseCase;

const userJohn = new User({
	id: "1",
	name: "John",
	password: "12345678",
	email: "john@email",
	created_at: new Date(),
	updated_at: new Date(),
});

const anneJohn = new User({
	id: "2",
	name: "Anne",
	password: "12345678",
	email: "anne@email",
	created_at: new Date(),
	updated_at: new Date(),
});

const studentJhon = new Student({
	id: "1",
	userId: "1",
	ra: "1",
	dateOfBirth: new Date(),
	organizationId: "1",
});
describe("Get Student Use Case", () => {
	beforeEach(() => {
		studentsRepository = new InMemoryStudentsRepository();
		sut = new GetStudentsUseCase(studentsRepository);
	});

	it("should be able to fetch student with pagination", async () => {
		studentsRepository.users.push(userJohn);
		studentsRepository.users.push(userJohn);
		studentsRepository.users.push(anneJohn);
		studentsRepository.items.push(studentJhon);
		studentsRepository.items.push(studentJhon);

		const query = await sut.execute(
			{
				page: 1,
				limit: 1,
				name: "John",
			},
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		expect(query.studentsItems).toHaveLength(1);
	});

	it("should not be able to fetch students without permission", async () => {
		await expect(() =>
			sut.execute(
				{
					page: 1,
					limit: 1,
					name: "John",
				},
				UserContextMapper.toModel(createUserContext(Role.VISITANTE)),
			),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
