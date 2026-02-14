import { randomUUID } from "node:crypto";
import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { TeacherAssignment } from "../../domain/entities/teacher-assignment-entity.ts";
import type { ITeacherAssignmentsRepository } from "../../domain/repositories/teacher-assignment-repository.ts";
import type { ICreateTeacherAssignmentDTO } from "../dtos/teacher-assignment-dto.ts";

export class CreateTeacherAssignmentUseCase {
	constructor(
		private teacherAssignmentRepository: ITeacherAssignmentsRepository,
	) {}

	async execute(dto: ICreateTeacherAssignmentDTO, userContext: IUserContext) {
		const newTeacherAssignment = new TeacherAssignment({
			id: randomUUID(),
			...dto,
		});

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("create", "TeacherAssignment")) {
			throw new ForbiddenActionError(
				"You don't have permission to create teacher assignments",
			);
		}

		const teacherAssignmentItem =
			await this.teacherAssignmentRepository.create(newTeacherAssignment);

		return { teacherAssignmentItem };
	}
}
