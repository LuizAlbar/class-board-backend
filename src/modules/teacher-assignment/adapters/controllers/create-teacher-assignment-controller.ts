import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { TeacherAssignmentMapper } from "../../application/mappers/teacher-assignment-mapper.ts";
import { createTeacherAssignmentSchema } from "../../application/validators/teacher-assignment-validator.ts";
import { makeCreateTeacherAssignmentUseCase } from "../../infrastructure/factories/make-create-teacher-assignment-use-case.ts";

export async function createTeacherAssignment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const teacherAssignmentBody = createTeacherAssignmentSchema.parse(
		request.body,
	);

	const user = await request.getCurrentMembership();

	const createTeacherAssignmentUseCase = makeCreateTeacherAssignmentUseCase();

	const { teacherAssignmentItem } =
		await createTeacherAssignmentUseCase.execute(teacherAssignmentBody, user);

	return FastifyResponsePresenter.success(
		reply,
		201,
		"Teacher Assignment created successfully",
		TeacherAssignmentMapper.toDTO(teacherAssignmentItem),
	);
}
