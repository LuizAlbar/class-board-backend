import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IEnrollmentsRepository } from "../../domain/repositories/enrollments-repository.ts";
import type { IQueryEnrollmentDTO } from "../dtos/enrollment-dto.ts";

export class GetEnrollmentsUseCase {
	constructor(private enrollmentsRepository: IEnrollmentsRepository) {}

	async execute(dto: IQueryEnrollmentDTO, userContext: IUserContext) {
		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("read", "Enrollment")) {
			throw new ForbiddenActionError(
				"You don't have permission to read enrollments",
			);
		}

		const enrollmentsItems =
			await this.enrollmentsRepository.findEnrollments(dto);

		if (!enrollmentsItems) {
			throw new ResourceNotFoundError("Enrollments not found");
		}

		return { enrollmentsItems };
	}
}
