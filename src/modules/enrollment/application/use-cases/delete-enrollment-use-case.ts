import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IEnrollmentsRepository } from "../../domain/repositories/enrollments-repository.ts";
import type { IDeleteEnrollmentDTO } from "../dtos/enrollment-dto.ts";

export class DeleteEnrollmentUseCase {
	constructor(private enrollmentRepository: IEnrollmentsRepository) {}

	async execute(dto: IDeleteEnrollmentDTO, userContext: IUserContext) {
		const existingEnrollment = this.enrollmentRepository.findById(dto.id);

		if (!existingEnrollment) {
			throw new ResourceNotFoundError("Enrollment not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("delete", "Enrollment")) {
			throw new ForbiddenActionError(
				"You don't have permission to delete enrollment",
			);
		}

		await this.enrollmentRepository.delete(dto.id);
	}
}
