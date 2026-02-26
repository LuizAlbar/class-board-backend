import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { Status } from "../../domain/entities/enrollment-entity.ts";
import { InMemoryEnrollmentsRepository } from "../../domain/repositories/in-memory/in-memory-enrollments-repository.ts";
import type { ICreateEnrollmentDTO } from "../dtos/enrollment-dto.ts";
import { CreateEnrollmentUseCase } from "./create-enrollment-use-case.ts";

let enrollmentsRepository: InMemoryEnrollmentsRepository;
let sut: CreateEnrollmentUseCase;

const enrollmentData: ICreateEnrollmentDTO = {
	year: 2023,
	studentId: "user-1",
	enrollmentDate: new Date(),
	status: Status.ACTIVE,
	classId: "class-1",
};
describe("Create Enrollment Use Case", () => {
	beforeEach(() => {
		enrollmentsRepository = new InMemoryEnrollmentsRepository();
		sut = new CreateEnrollmentUseCase(enrollmentsRepository);
	});

	it("should be able for a authorized user to create a enrollment", async () => {
		const { enrollmentItem } = await sut.execute(
			enrollmentData,
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		expect(enrollmentItem.classId).toEqual(enrollmentData.classId);
	});

	it("should not be able to create enrollment without permission", async () => {
		await expect(
			async () =>
				await sut.execute(
					enrollmentData,
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
