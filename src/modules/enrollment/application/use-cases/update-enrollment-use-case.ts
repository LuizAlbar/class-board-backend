import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IEnrollmentsRepository } from "../../domain/repositories/enrollments-repository.ts";
import type { IUpdateEnrollmentDTO } from "../dtos/enrollment-dto.ts";

export class UpdateEnrollmentUseCase {
	constructor(private enrollmentsRepository: IEnrollmentsRepository) {}

	async execute(dto: IUpdateEnrollmentDTO, userContext: IUserContext) {
		const existingEnrollment = this.enrollmentsRepository.findById(dto.id);

		if (!existingEnrollment) {
			throw new ResourceNotFoundError("Enrollment not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("update", "Enrollment")) {
			throw new ForbiddenActionError(
				"You don't have permission to update enrollment",
			);
		}

		const enrollmentItem = await this.enrollmentsRepository.update(dto.id, dto);

		return { enrollmentItem };
	}
}
