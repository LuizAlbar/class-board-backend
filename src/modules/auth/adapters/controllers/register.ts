import type { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterUseCase } from "../../application/use-cases/factories/make-register-use-case.ts";
import { createUserSchema } from "../../application/validators/user-validators.ts";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const { name, email, password, role } = createUserSchema.parse(request.body);

	try {
		const registerUseCase = makeRegisterUseCase();

		await registerUseCase.execute({ name, email, password, role });
	} catch (_err) {
		throw Error();
	}

	return reply.status(201).send();
}
