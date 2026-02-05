import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { ClassMapper } from "../../application/mappers/class-mapper.ts";
import { createClassSchema } from "../../application/validators/class-validator.ts";
import { makeCreateClassUseCase } from "../../infrastructure/factories/make-create-class-use-case.ts";

export async function createClass(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const classBody = createClassSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const createClassUseCase = makeCreateClassUseCase();

	const { classItem } = await createClassUseCase.execute(classBody, user);

	return FastifyResponsePresenter.success(
		reply,
		201,
		"Class created successfully",
		ClassMapper.toDTO(classItem),
	);
}
