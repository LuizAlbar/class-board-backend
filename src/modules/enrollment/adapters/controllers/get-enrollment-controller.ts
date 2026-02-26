import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { EnrollmentMapper } from "../../application/mappers/enrollment-mapper.ts";
import { queryEnrollmentSchema } from "../../application/validators/enrollment-validator.ts";
import { makeGetEnrollmentUseCase } from "../../infrastructure/factories/make-get-enrollments-use-case.ts";

export async function getEnrollment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const enrollmentQuery = queryEnrollmentSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const getEnrollmentUseCase = makeGetEnrollmentUseCase();

	const { enrollmentsItems } = await getEnrollmentUseCase.execute(
		enrollmentQuery,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"Enrollments found successfully",
		EnrollmentMapper.toManyQueryDTOV2(enrollmentsItems),
	);
}
