import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { UserMapper } from "../../application/mappers/user-mapper.ts";
import { createUserSchema } from "../../application/validators/user-validators.ts";
import { makeRegisterUseCase } from "../../infrastructure/factories/make-register-use-case.ts";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const { name, email, password } = createUserSchema.parse(request.body);

	const registerUseCase = makeRegisterUseCase();

	const { user } = await registerUseCase.execute({
		name,
		email,
		password,
	});

	return FastifyResponsePresenter.success(
		reply,
		201,
		"User registered successfully",
		UserMapper.toDTO(user),
	);
}
