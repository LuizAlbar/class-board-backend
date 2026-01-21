import type { FastifyReply, FastifyRequest } from "fastify";
import {
	BadRequestError,
	ForbiddenAction,
	UnauthorizedUserError,
} from "../errors/http-errors.ts";

export async function verifyOrgContext(
	request: FastifyRequest,
	_reply: FastifyReply,
) {
	try {
		const { organizationId } = request.params as { organizationId: string };
		const userContext = request.user.sub.orgId || "";

		if (!organizationId) {
			throw new BadRequestError(organizationId);
		}

		if (!userContext) {
			throw new UnauthorizedUserError();
		}
		if (organizationId !== userContext) {
			throw new ForbiddenAction("You are not allowed in this organization.");
		}
	} catch {
		throw new Error();
	}
}
