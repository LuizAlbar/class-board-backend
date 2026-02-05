import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { DisciplineMapper } from "../../application/mappers/discipline-mapper.ts";
import { createDisciplineSchema } from "../../application/validators/discipline-validator.ts";
import { makeCreateDisciplineUseCase } from "../../infrastructure/factories/make-create-discipline-use-case.ts";

export async function createDiscipline(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const disciplineBody = createDisciplineSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const createDisciplineUseCase = makeCreateDisciplineUseCase();

	const { disciplineItem } = await createDisciplineUseCase.execute(
		disciplineBody,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		201,
		"Discipline created successfully",
		DisciplineMapper.toDTO(disciplineItem),
	);
}
