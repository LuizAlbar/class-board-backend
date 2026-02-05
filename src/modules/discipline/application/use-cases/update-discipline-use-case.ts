import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IDisciplinesRepository } from "../../domain/repositories/disciplines-repository.ts";
import type { IUpdateDisciplineDTO } from "../dtos/discipline-dto.ts";

export class UpdateDisciplineUseCase {
	constructor(private disciplinesRepository: IDisciplinesRepository) {}

	async execute(dto: IUpdateDisciplineDTO, userContext: IUserContext) {
		const existingDiscipline = this.disciplinesRepository.findById(dto.id);

		if (!existingDiscipline) {
			throw new ResourceNotFoundError("Discipline not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("update", "Discipline")) {
			throw new ForbiddenActionError(
				"You don't have permission to update disciplines",
			);
		}

		const disciplineItem = await this.disciplinesRepository.update(dto.id, dto);

		return { disciplineItem };
	}
}
