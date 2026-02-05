import { type IUserContext, UserContextMapper } from "@/shared/auth/context.ts";
import { getUserPermissions } from "@/shared/auth/get-user-permissions.ts";
import {
	ForbiddenActionError,
	ResourceNotFoundError,
} from "@/shared/errors/http-errors.ts";
import type { IDisciplinesRepository } from "../../domain/repositories/disciplines-repository.ts";
import type { IQueryDisciplineDTO } from "../dtos/discipline-dto.ts";

export class GetDisciplinesUseCase {
	constructor(private disciplinesRepository: IDisciplinesRepository) {}

	async execute(dto: IQueryDisciplineDTO, userContext: IUserContext) {
		const context = UserContextMapper.toModel(userContext);
		const { cannot } = getUserPermissions(context.userId, context.role);
		if (cannot("read", "Discipline")) {
			throw new ForbiddenActionError(
				"You don't have permission to read disciplines",
			);
		}

		const disciplinesItems =
			await this.disciplinesRepository.findDisciplines(dto);

		if (!disciplinesItems) {
			throw new ResourceNotFoundError("Disciplines not found");
		}

		return { disciplinesItems };
	}
}
