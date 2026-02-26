import { beforeEach, describe, expect, it } from "vitest";
import { UserContextMapper } from "@/shared/auth/context.ts";
import { Role } from "@/shared/auth/roles.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { createUserContext } from "@/shared/utils/test/create-user-context.ts";
import { Status } from "../../domain/entities/enrollment-entity.ts";
import { InMemoryEnrollmentsRepository } from "../../domain/repositories/in-memory/in-memory-enrollments-repository.ts";
import type { ICreateEnrollmentDTO } from "../dtos/enrollment-dto.ts";
import { UpdateEnrollmentUseCase } from "./update-enrollment-use-case.ts";

let enrollmentsRepository: InMemoryEnrollmentsRepository;
let sut: UpdateEnrollmentUseCase;

const enrollmentData: ICreateEnrollmentDTO = {
	year: 2023,
	studentId: "user-1",
	enrollmentDate: new Date(),
	status: Status.ACTIVE,
	classId: "class-1",
};
describe("Update Enrollment Use Case", () => {
	beforeEach(() => {
		enrollmentsRepository = new InMemoryEnrollmentsRepository();
		sut = new UpdateEnrollmentUseCase(enrollmentsRepository);
	});

	it("should be able for a authorized user to update a enrollment", async () => {
		const createdEnrollment =
			await enrollmentsRepository.create(enrollmentData);

		const updatedEnrollment = await sut.execute(
			{
				id: createdEnrollment.id,
				studentId: "user-2",
			},
			UserContextMapper.toModel(createUserContext(Role.COORDENADOR)),
		);

		const getUpdatedEnrollment = await enrollmentsRepository.findById(
			createdEnrollment.id,
		);

		expect(getUpdatedEnrollment?.studentId).toEqual(
			updatedEnrollment.enrollmentItem.studentId,
		);
	});

	it("should not be able to update a enrollment without permission", async () => {
		await expect(
			async () =>
				await sut.execute(
					{ id: "123", studentId: "user-2" },
					UserContextMapper.toModel(createUserContext(Role.ESTUDANTE)),
				),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
