import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { DisciplineMapper } from "../../application/mappers/discipline-mapper.ts";
import { updateDisciplineSchema } from "../../application/validators/discipline-validator.ts";
import { makeUpdateDisciplineUseCase } from "../../infrastructure/factories/make-update-discipline-use-case.ts";

export async function updateDiscipline(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updatedDisciplineBody = updateDisciplineSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const updateDisciplineUseCase = makeUpdateDisciplineUseCase();

	const { disciplineItem } = await updateDisciplineUseCase.execute(
		updatedDisciplineBody,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"Discipline updated successfully",
		DisciplineMapper.toDTO(disciplineItem),
	);
}
