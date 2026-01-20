import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { InvalidCookieError } from "../../domain/errors/invalid-cookie-error.ts";
import { UnauthorizedUserError } from "../../domain/errors/unauthorized-user-error.ts";
import { MakeRefreshAccessTokenUseCase } from "../../infrastructure/factories/make-refresh-access-token-use-case.ts";
import { FastifyAuthCookiePresenter } from "../http/fastify-cookie-presenter.ts";

export async function refreshToken(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const refreshAccessTokenUseCase = MakeRefreshAccessTokenUseCase(
			request.server,
		);

		const token = await refreshAccessTokenUseCase.execute(
			request.cookies.refreshToken || "",
		);

		FastifyAuthCookiePresenter.refreshAccessToken(reply, token);

		return FastifyResponsePresenter.success(
			reply,
			200,
			"Access token refreshed successfully",
		);
	} catch (err) {
		if (err instanceof UnauthorizedUserError) {
			return FastifyResponsePresenter.error(reply, 401, err.message);
		}
		if (err instanceof InvalidCookieError) {
			return FastifyResponsePresenter.error(reply, 401, err.message);
		}

		throw err;
	}
}
