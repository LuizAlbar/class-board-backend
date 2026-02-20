import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { deleteStudentSchema } from "../../application/validators/student-validator.ts";
import { makeDeleteStudentUseCase } from "../../infrastructure/factories/make-delete-student-use-case.ts";

export async function deleteStudent(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const studentBody = deleteStudentSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const deleteStudentUseCase = makeDeleteStudentUseCase();

	await deleteStudentUseCase.execute(studentBody, user);

	return FastifyResponsePresenter.success(
		reply,
		204,
		"Student deleted successfully",
	);
}
