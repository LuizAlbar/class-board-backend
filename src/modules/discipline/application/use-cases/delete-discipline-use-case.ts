import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IDisciplinesRepository } from "../../domain/repositories/disciplines-repository.ts";
import type { IDeleteDisciplineDTO } from "../dtos/discipline-dto.ts";

export class DeleteDisciplineUseCase {
	constructor(private disciplinesRepository: IDisciplinesRepository) {}

	async execute(dto: IDeleteDisciplineDTO, userContext: IUserContext) {
		const existingDiscipline = this.disciplinesRepository.findById(dto.id);

		if (!existingDiscipline) {
			throw new ResourceNotFoundError("Discipline not found");
		}

		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("delete", "Discipline")) {
			throw new ForbiddenActionError(
				"You don't have permission to delete disciplines",
			);
		}

		await this.disciplinesRepository.delete(dto.id);
	}
}
