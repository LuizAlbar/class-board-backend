import { randomUUID } from "node:crypto";
import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Student } from "../../domain/entities/student-entity.ts";
import type { IStudentsRepository } from "../../domain/repositories/students-repository.ts";
import type { ICreateStudentDTO } from "../dtos/student-dto.ts";

export class CreateStudentUseCase {
	constructor(private studentsRepository: IStudentsRepository) {}

	async execute(dto: ICreateStudentDTO, userContext: IUserContext) {
		const newStudent = new Student({
			id: randomUUID(),
			...dto,
		});

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("create", "Student")) {
			throw new ForbiddenActionError(
				"You don't have permission to create students",
			);
		}

		const studentItem = await this.studentsRepository.create(newStudent);

		return { studentItem };
	}
}
