import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { EnrollmentMapper } from "../../application/mappers/enrollment-mapper.ts";
import { createEnrollmentSchema } from "../../application/validators/enrollment-validator.ts";
import { makeCreateEnrollmentUseCase } from "../../infrastructure/factories/make-create-enrollment-use-case.ts";

export async function createEnrollment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const enrollmentBody = createEnrollmentSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const createEnrollmentUseCase = makeCreateEnrollmentUseCase();

	const { enrollmentItem } = await createEnrollmentUseCase.execute(
		enrollmentBody,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		201,
		"Enrollment created successfully",
		EnrollmentMapper.toDTO(enrollmentItem),
	);
}
