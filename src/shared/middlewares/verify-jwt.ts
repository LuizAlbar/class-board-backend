import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "../utils/response-handler/fastify-response-presenter.ts";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (_err) {
		return FastifyResponsePresenter.error(reply, 401, "Unauthorized");
	}
}
