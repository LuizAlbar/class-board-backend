import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { ITeachersRepository } from "../../domain/repositories/teachers-repository.ts";
import type { IQueryTeacherDTO } from "../dtos/teacher-dto.ts";

export class GetTeachersUseCase {
	constructor(private teachersRepository: ITeachersRepository) {}

	async execute(dto: IQueryTeacherDTO, userContext: IUserContext) {
		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("read", "Teacher")) {
			throw new ForbiddenActionError(
				"You don't have permission to read teachers",
			);
		}

		const teachersItems = await this.teachersRepository.findTeachers(dto);

		if (!teachersItems) {
			throw new ResourceNotFoundError("Teachers not found");
		}

		return { teachersItems };
	}
}
