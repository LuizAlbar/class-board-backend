import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IStudentsRepository } from "../../domain/repositories/students-repository.ts";
import type { IDeleteStudentDTO } from "../dtos/student-dto.ts";

export class DeleteStudentUseCase {
	constructor(private studentsRepository: IStudentsRepository) {}

	async execute(dto: IDeleteStudentDTO, userContext: IUserContext) {
		const existingStudent = this.studentsRepository.findById(dto.id);

		if (!existingStudent) {
			throw new ResourceNotFoundError("Student not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("delete", "Student")) {
			throw new ForbiddenActionError(
				"You don't have permission to delete students",
			);
		}

		await this.studentsRepository.delete(dto.id);
	}
}
