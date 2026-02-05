import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IClassesRepository } from "../../domain/repositories/class-repository.ts";
import type { IUpdateClassDTO } from "../dtos/class-dto.ts";

export class UpdateClassUseCase {
	constructor(private classesRepository: IClassesRepository) {}

	async execute(dto: IUpdateClassDTO, userContext: IUserContext) {
		const existingClass = this.classesRepository.findById(dto.id);

		if (!existingClass) {
			throw new ResourceNotFoundError("Class not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("update", "Class")) {
			throw new ForbiddenActionError(
				"You don't have permission to update classes",
			);
		}

		const classItem = await this.classesRepository.update(dto.id, dto);

		return { classItem };
	}
}
