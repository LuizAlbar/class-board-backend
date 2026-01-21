import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { authenticateUserSchema } from "../../application/validators/user-validators.ts";
import { makeAuthenticateUseCase } from "../../infrastructure/factories/make-authenticate-use-case.ts";
import { FastifyAuthCookiePresenter } from "../http/fastify-cookie-presenter.ts";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { email, password } = authenticateUserSchema.parse(request.body);

	const authenticateUseCase = makeAuthenticateUseCase(request.server);

	const { user, refreshToken, accessToken } = await authenticateUseCase.execute(
		{ email, password },
	);

	FastifyAuthCookiePresenter.clearAuthCookies(reply);
	FastifyAuthCookiePresenter.setAuthCookies(reply, accessToken, refreshToken);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"User authenticated successfully",
		user,
	);
}
