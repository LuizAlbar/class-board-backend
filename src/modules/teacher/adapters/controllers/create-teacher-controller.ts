import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { TeacherMapper } from "../../application/mappers/teacher-mapper.ts";
import { createTeacherSchema } from "../../application/validators/teacher-validator.ts";
import { makeCreateTeacherUseCase } from "../../infrastructure/factories/make-create-teacher-use-case.ts";

export async function createTeacher(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const teacherBody = createTeacherSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const createTeacherUseCase = makeCreateTeacherUseCase();

	const { teacherItem } = await createTeacherUseCase.execute(teacherBody, user);

	return FastifyResponsePresenter.success(
		reply,
		201,
		"Teacher created successfully",
		TeacherMapper.toDTO(teacherItem),
	);
}
