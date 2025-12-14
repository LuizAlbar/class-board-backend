import type { FastifyReply, FastifyRequest } from "fastify";
import { UserMapper } from "../../application/mappers/user-mapper.ts";
import { makeRegisterUseCase } from "../../application/use-cases/factories/make-register-use-case.ts";
import { createUserSchema } from "../../application/validators/user-validators.ts";
import { FastifyResponsePresenter } from "../http/fastify-response-presenter.ts";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const { name, email, password, role } = createUserSchema.parse(request.body);

	try {
		const registerUseCase = makeRegisterUseCase();

		const { user } = await registerUseCase.execute({
			name,
			email,
			password,
			role,
		});

		return FastifyResponsePresenter.success(
			reply,
			201,
			"User registered successfully",
			UserMapper.toDTO(user),
		);
	} catch (_err) {
		throw Error();
	}
}
