import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { ITeacherAssignmentsRepository } from "../../domain/repositories/teacher-assignment-repository.ts";
import type { IUpdateTeacherAssignmentDTO } from "../dtos/teacher-assignment-dto.ts";

export class UpdateTeacherAssignmentUseCase {
	constructor(
		private teacherAssignmentsRepository: ITeacherAssignmentsRepository,
	) {}

	async execute(dto: IUpdateTeacherAssignmentDTO, userContext: IUserContext) {
		const existingTeacherAssignment =
			this.teacherAssignmentsRepository.findById(dto.id);

		if (!existingTeacherAssignment) {
			throw new ResourceNotFoundError("Teacher Assignment not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("update", "TeacherAssignment")) {
			throw new ForbiddenActionError(
				"You don't have permission to update teacher assignments",
			);
		}

		const teacherAssignmentItem =
			await this.teacherAssignmentsRepository.update(dto.id, dto);

		return { teacherAssignmentItem };
	}
}
