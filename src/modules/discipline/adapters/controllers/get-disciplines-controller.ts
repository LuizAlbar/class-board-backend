import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { DisciplineMapper } from "../../application/mappers/discipline-mapper.ts";
import { queryDisciplineSchema } from "../../application/validators/discipline-validator.ts";
import { makeGetDisciplineUseCase } from "../../infrastructure/factories/make-get-disciplines-use-case.ts";

export async function getDisciplines(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const queryDisciplineBody = queryDisciplineSchema.parse(request.query);

	const user = await request.getCurrentMembership();

	const getDisciplineUseCase = makeGetDisciplineUseCase();

	const { disciplinesItems } = await getDisciplineUseCase.execute(
		queryDisciplineBody,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"Disciplines found successfully",
		DisciplineMapper.manyToDTO(disciplinesItems),
	);
}
