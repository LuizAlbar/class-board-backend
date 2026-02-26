import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { EnrollmentMapper } from "../../application/mappers/enrollment-mapper.ts";
import { updateEnrollmentSchema } from "../../application/validators/enrollment-validator.ts";
import { makeUpdateEnrollmentUseCase } from "../../infrastructure/factories/make-update-enrollment-use-case.ts";

export async function updateEnrollment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updatedEnrollmentBody = updateEnrollmentSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const updateClassUseCase = makeUpdateEnrollmentUseCase();

	const { enrollmentItem } = await updateClassUseCase.execute(
		updatedEnrollmentBody,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"Enrollment updated successfully",
		EnrollmentMapper.toDTO(enrollmentItem),
	);
}
