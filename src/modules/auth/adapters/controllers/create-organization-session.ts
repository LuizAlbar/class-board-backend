import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { membershipAuthenticationSchema } from "../../application/validators/user-validators.ts";
import { ForbiddenOrganizationError } from "../../domain/errors/forbidden-organization-error.ts";
import { makeCreateOrganizationSession } from "../../infrastructure/factories/make-create-organization-session.ts";
import { FastifyAuthCookiePresenter } from "../http/fastify-cookie-presenter.ts";

export async function createOrganizationSession(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { userId, organizationId } = membershipAuthenticationSchema.parse(
		request.body,
	);

	try {
		const createOrganizationSession = makeCreateOrganizationSession(
			request.server,
		);

		const token = await createOrganizationSession.execute({
			userId,
			organizationId,
		});

		FastifyAuthCookiePresenter.organizationAccessToken(reply, token);

		return FastifyResponsePresenter.success(
			reply,
			200,
			"Organization session created successfully",
		);
	} catch (err) {
		if (err instanceof ForbiddenOrganizationError) {
			return FastifyResponsePresenter.error(reply, 403, err.message);
		}
	}
}
