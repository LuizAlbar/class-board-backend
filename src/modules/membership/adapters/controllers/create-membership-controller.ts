import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { MembershipMapper } from "../../application/mappers/membership-mapper.ts";
import { createMembershipSchema } from "../../application/validators/membership-validator.ts";
import { makeCreateMembershipUseCase } from "../../infrastructure/factories/make-create-membership-use-case.ts";

export async function createMembership(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const membershipBody = createMembershipSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	try {
		const createMembershipUseCase = makeCreateMembershipUseCase();

		const { membership } = await createMembershipUseCase.execute(
			membershipBody,
			user,
		);

		return FastifyResponsePresenter.success(
			reply,
			201,
			"Membership created successfully",
			MembershipMapper.toDTO(membership),
		);
	} catch (err) {
		if (err) {
			throw err;
		}
	}
}
