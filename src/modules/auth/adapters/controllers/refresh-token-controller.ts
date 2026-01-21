import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { MakeRefreshAccessTokenUseCase } from "../../infrastructure/factories/make-refresh-access-token-use-case.ts";
import { FastifyAuthCookiePresenter } from "../http/fastify-cookie-presenter.ts";

export async function refreshToken(
	request: FastifyRequest,
	reply: FastifyReply,
) {
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
}
