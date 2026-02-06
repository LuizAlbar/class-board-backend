import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { ITeachersRepository } from "../../domain/repositories/teachers-repository.ts";
import type { IDeleteTeacherDTO } from "../dtos/teacher-dto.ts";

export class DeleteTeacherUseCase {
	constructor(private teachersRepository: ITeachersRepository) {}

	async execute(dto: IDeleteTeacherDTO, userContext: IUserContext) {
		const existingTeacher = this.teachersRepository.findById(dto.id);

		if (!existingTeacher) {
			throw new ResourceNotFoundError("Teacher not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("delete", "Teacher")) {
			throw new ForbiddenActionError(
				"You don't have permission to delete teachers",
			);
		}

		await this.teachersRepository.delete(dto.id);
	}
}
