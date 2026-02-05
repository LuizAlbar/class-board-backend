import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { ClassMapper } from "../../application/mappers/class-mapper.ts";
import { updateClassSchema } from "../../application/validators/class-validator.ts";
import { makeUpdateClassUseCase } from "../../infrastructure/factories/make-update-class-use-case.ts";

export async function updateClass(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updatedClassBody = updateClassSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const updateClassUseCase = makeUpdateClassUseCase();

	const { classItem } = await updateClassUseCase.execute(
		updatedClassBody,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		201,
		"Class updated successfully",
		ClassMapper.toDTO(classItem),
	);
}
