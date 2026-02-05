import { randomUUID } from "node:crypto";
import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Class } from "../../domain/entities/class-entity.ts";
import type { IClassesRepository } from "../../domain/repositories/class-repository.ts";
import type { ICreateClassDTO } from "../dtos/class-dto.ts";

export class CreateClassUseCase {
	constructor(private membershipRepository: IClassesRepository) {}

	async execute(dto: ICreateClassDTO, userContext: IUserContext) {
		const newClass = new Class({
			id: randomUUID(),
			name: dto.name,
			period: dto.period,
			organizationId: dto.organizationId,
			year: dto.year,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("create", "Class")) {
			throw new ForbiddenActionError(
				"You don't have permission to create classes",
			);
		}

		const classItem = await this.membershipRepository.create(newClass);

		return { classItem };
	}
}
