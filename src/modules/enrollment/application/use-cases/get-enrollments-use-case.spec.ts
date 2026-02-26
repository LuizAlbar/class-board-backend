import { beforeEach, describe, expect, it } from "vitest";
import { User } from "@/modules/auth/domain/entities/user-entity.ts";
import { Class, Period } from "@/modules/class/domain/entities/class-entity.ts";
import { Student } from "@/modules/student/domain/entities/student-entity.ts";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { Enrollment, Status } from "../../domain/entities/enrollment-entity.ts";
import { InMemoryEnrollmentsRepository } from "../../domain/repositories/in-memory/in-memory-enrollments-repository.ts";
import { GetEnrollmentsUseCase } from "./get-enrollments-use-case.ts";

let enrollmentsRepository: InMemoryEnrollmentsRepository;
let sut: GetEnrollmentsUseCase;

const enrollmentData = new Enrollment({
	id: "1",
	year: 2023,
	enrollmentDate: new Date(),
	status: Status.ACTIVE,
	classId: "1",
	studentId: "1",
});

const studentData = new Student({
	id: "1",
	dateOfBirth: new Date(),
	ra: "1234",
	organizationId: "1",
	userId: "1",
});

const classData = new Class({
	id: "1",
	name: "Turma-1",
	organizationId: "1",
	period: Period.MANHA,
	year: 2023,
	createdAt: new Date(),
	updatedAt: new Date(),
});
describe("Get Enrollment Use Case", () => {
	beforeEach(() => {
		enrollmentsRepository = new InMemoryEnrollmentsRepository();
		sut = new GetEnrollmentsUseCase(enrollmentsRepository);
	});

	it("should be able to fetch enrollment with pagination", async () => {
		enrollmentsRepository.students.push(studentData);
		enrollmentsRepository.classes.push(classData);

		const query = await sut.execute(
			{
				page: 1,
				limit: 1,
				name: "John",
			},
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		expect(query.enrollmentsItems).toHaveLength(1);
	});

	it("should not be able to fetch enrollments without permission", async () => {
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
