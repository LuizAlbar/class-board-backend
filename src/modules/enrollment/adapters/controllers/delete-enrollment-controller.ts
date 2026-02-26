import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { deleteEnrollmentSchema } from "../../application/validators/enrollment-validator.ts";
import { makeDeleteEnrollmentUseCase } from "../../infrastructure/factories/make-delete-enrollment-use-case.ts";

export async function deleteEnrollment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const enrollmentBody = deleteEnrollmentSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const deleteEnrollmentUseCase = makeDeleteEnrollmentUseCase();

	await deleteEnrollmentUseCase.execute(enrollmentBody, user);

	return FastifyResponsePresenter.success(
		reply,
		204,
		"Enrollment deleted successfully",
	);
}
