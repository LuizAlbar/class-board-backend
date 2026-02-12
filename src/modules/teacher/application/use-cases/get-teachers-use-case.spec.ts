import { beforeEach, describe, expect, it } from "vitest";
import { User } from "@/modules/auth/domain/entities/user-entity.ts";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { Teacher } from "../../domain/entities/teacher-entity.ts";
import { InMemoryTeachersRepository } from "../../domain/repositories/in-memory/in-memory-teachers-repository.ts";
import { GetTeachersUseCase } from "./get-teachers-use-case.ts";

let teachersRepository: InMemoryTeachersRepository;
let sut: GetTeachersUseCase;

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

const teacherJhon = new Teacher({
	id: "1",
	userId: "1",
	organizationId: "1",
});
describe("Get Teacher Use Case", () => {
	beforeEach(() => {
		teachersRepository = new InMemoryTeachersRepository();
		sut = new GetTeachersUseCase(teachersRepository);
	});

	it("should be able to fetch teacher with pagination", async () => {
		teachersRepository.users.push(userJohn);
		teachersRepository.users.push(userJohn);
		teachersRepository.users.push(anneJohn);
		teachersRepository.items.push(teacherJhon);
		teachersRepository.items.push(teacherJhon);

		const query = await sut.execute(
			{
				page: 1,
				limit: 1,
				name: "John",
			},
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		expect(query.teachersItems).toHaveLength(1);
	});

	it("should not be able to fetch teachers without permission", async () => {
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
