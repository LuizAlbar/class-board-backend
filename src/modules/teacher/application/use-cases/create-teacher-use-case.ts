import { randomUUID } from "node:crypto";
import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Teacher } from "../../domain/entities/teacher-entity.ts";
import type { ITeachersRepository } from "../../domain/repositories/teachers-repository.ts";
import type { ICreateTeacherDTO } from "../dtos/teacher-dto.ts";

export class CreateTeacherUseCase {
	constructor(private teachersRepository: ITeachersRepository) {}

	async execute(dto: ICreateTeacherDTO, userContext: IUserContext) {
		const newTeacher = new Teacher({
			id: randomUUID(),
			...dto,
		});

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("create", "Teacher")) {
			throw new ForbiddenActionError(
				"You don't have permission to create teachers",
			);
		}

		const teacherItem = await this.teachersRepository.create(newTeacher);

		return { teacherItem };
	}
}
