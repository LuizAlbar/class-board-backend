import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma.ts";
import { UnauthorizedError } from "../errors/http-errors.ts";

export async function getUserMembership(
	request: FastifyRequest,
	_reply: FastifyReply,
) {
	request.getCurrentOrganizationId = () => {
		const { orgId } = request.user.sub;

		if (!orgId) {
			throw new Error("No org error");
		}

		return orgId;
	};

	request.getCurrentMembership = async () => {
		const { id: userId } = request.user.sub;
		const organizationId = request.getCurrentOrganizationId();

		const member = await prisma.membership.findUnique({
			where: {
				userId_organizationId: {
					userId,
					organizationId,
				},
			},
		});

		if (!member) {
			throw new UnauthorizedError();
		}

		return {
			userId: member.userId,
			role: member.role,
		};
	};
}
