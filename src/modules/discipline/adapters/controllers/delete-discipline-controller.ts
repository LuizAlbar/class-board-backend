import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { deleteDisciplineSchema } from "../../application/validators/discipline-validator.ts";
import { makeDeleteDisciplineUseCase } from "../../infrastructure/factories/make-delete-discipline-use-case.ts";

export async function deleteDiscipline(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const deletedDisciplineBody = deleteDisciplineSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const deleteDisciplineUseCase = makeDeleteDisciplineUseCase();

	await deleteDisciplineUseCase.execute(deletedDisciplineBody, user);

	return FastifyResponsePresenter.success(
		reply,
		204,
		"Discipline deleted successfully",
	);
}
