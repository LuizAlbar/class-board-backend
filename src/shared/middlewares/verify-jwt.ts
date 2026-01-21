import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/http-errors.ts";

export async function verifyJWT(request: FastifyRequest, _reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (_err) {
		throw new UnauthorizedError();
	}
}
