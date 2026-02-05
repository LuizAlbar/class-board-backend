import { randomUUID } from "node:crypto";
import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { Discipline } from "../../domain/entities/discipline-entity.ts";
import type { IDisciplinesRepository } from "../../domain/repositories/disciplines-repository.ts";
import type { ICreateDisciplineDTO } from "../dtos/discipline-dto.ts";

export class CreateDisciplineUseCase {
	constructor(private disciplinesRepository: IDisciplinesRepository) {}

	async execute(dto: ICreateDisciplineDTO, userContext: IUserContext) {
		const newDiscipline = new Discipline({
			id: randomUUID(),
			...dto,
		});

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("create", "Discipline")) {
			throw new ForbiddenActionError(
				"You don't have permission to create disciplines",
			);
		}

		const disciplineItem =
			await this.disciplinesRepository.create(newDiscipline);

		return { disciplineItem };
	}
}
