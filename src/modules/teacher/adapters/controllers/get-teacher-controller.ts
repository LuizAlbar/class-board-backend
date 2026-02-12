import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { TeacherMapper } from "../../application/mappers/teacher-mapper.ts";
import { queryTeacherSchema } from "../../application/validators/teacher-validator.ts";
import { makeGetTeacherUseCase } from "../../infrastructure/factories/make-get-teachers-use-case.ts";

export async function getTeacher(request: FastifyRequest, reply: FastifyReply) {
	const teacherQuery = queryTeacherSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const getTeacherUseCase = makeGetTeacherUseCase();

	const { teachersItems } = await getTeacherUseCase.execute(teacherQuery, user);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"Teachers found successfully",
		TeacherMapper.toManyQueryDTOV2(teachersItems),
	);
}
