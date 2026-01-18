import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { UserMapper } from "../../application/mappers/user-mapper.ts";
import { ResourceNotFoundError } from "../../domain/errors/resource-not-found.ts";
import { makeGetProfileUseCase } from "../../infrastructure/factories/make-get-profile-use-case.ts";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
	try {
		const getProfileUseCase = makeGetProfileUseCase();

		const { user } = await getProfileUseCase.execute(request.user.sub.id);

		return FastifyResponsePresenter.success(
			reply,
			200,
			"User profile found successfully",
			UserMapper.toDTO(user),
		);
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return FastifyResponsePresenter.error(reply, 404, err.message);
		}
	}
}
