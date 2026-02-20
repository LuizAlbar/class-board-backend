import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IStudentsRepository } from "../../domain/repositories/students-repository.ts";
import type { IQueryStudentDTO } from "../dtos/student-dto.ts";

export class GetStudentsUseCase {
	constructor(private studentsRepository: IStudentsRepository) {}

	async execute(dto: IQueryStudentDTO, userContext: IUserContext) {
		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("read", "Student")) {
			throw new ForbiddenActionError(
				"You don't have permission to read students",
			);
		}

		const studentsItems = await this.studentsRepository.findStudents(dto);

		if (!studentsItems) {
			throw new ResourceNotFoundError("Students not found");
		}

		return { studentsItems };
	}
}
