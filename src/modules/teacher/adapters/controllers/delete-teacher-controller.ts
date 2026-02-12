import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { deleteTeacherSchema } from "../../application/validators/teacher-validator.ts";
import { makeDeleteTeacherUseCase } from "../../infrastructure/factories/make-delete-teacher-use-case.ts";

export async function deleteTeacher(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const teacherBody = deleteTeacherSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const deleteTeacherUseCase = makeDeleteTeacherUseCase();

	await deleteTeacherUseCase.execute(teacherBody, user);

	return FastifyResponsePresenter.success(
		reply,
		204,
		"Teacher deleted successfully",
	);
}
