import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { TeacherAssignmentMapper } from "../../application/mappers/teacher-assignment-mapper.ts";
import { updateTeacherAssignmentSchema } from "../../application/validators/teacher-assignment-validator.ts";
import { makeUpdateTeacherAssignmentUseCase } from "../../infrastructure/factories/make-update-class-use-case.ts";

export async function updateTeacherAssignment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updatedTeacherAssignmentBody = updateTeacherAssignmentSchema.parse(
		request.body,
	);

	const user = await request.getCurrentMembership();

	const updateClassUseCase = makeUpdateTeacherAssignmentUseCase();

	const { teacherAssignmentItem } = await updateClassUseCase.execute(
		updatedTeacherAssignmentBody,
		user,
	);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"Teacher Assignment updated successfully",
		TeacherAssignmentMapper.toDTO(teacherAssignmentItem),
	);
}
