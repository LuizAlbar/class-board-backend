import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { UserMapper } from "../../application/mappers/user-mapper.ts";
import { makeGetProfileUseCase } from "../../infrastructure/factories/make-get-profile-use-case.ts";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
	const getProfileUseCase = makeGetProfileUseCase();

	const { user } = await getProfileUseCase.execute(request.user.sub.id);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"User profile found successfully",
		UserMapper.toDTO(user),
	);
}
