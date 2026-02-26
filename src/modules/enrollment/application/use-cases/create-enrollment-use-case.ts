import { randomUUID } from "node:crypto";
import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Enrollment } from "../../domain/entities/enrollment-entity.ts";
import type { IEnrollmentsRepository } from "../../domain/repositories/enrollments-repository.ts";
import type { ICreateEnrollmentDTO } from "../dtos/enrollment-dto.ts";

export class CreateEnrollmentUseCase {
	constructor(private enrollmentRepository: IEnrollmentsRepository) {}

	async execute(dto: ICreateEnrollmentDTO, userContext: IUserContext) {
		const newEnrollment = new Enrollment({
			id: randomUUID(),
			...dto,
		});

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("create", "Enrollment")) {
			throw new ForbiddenActionError(
				"You don't have permission to create enrollment",
			);
		}

		const enrollmentItem =
			await this.enrollmentRepository.create(newEnrollment);

		return { enrollmentItem };
	}
}
