import type { FastifyReply, FastifyRequest } from "fastify";
import {
	BadRequestError,
	ForbiddenActionError,
	UnauthorizedError,
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
			throw new UnauthorizedError();
		}
		if (organizationId !== userContext) {
			throw new ForbiddenActionError(
				"You are not allowed in this organization.",
			);
		}
	} catch {
		throw new Error();
	}
}
