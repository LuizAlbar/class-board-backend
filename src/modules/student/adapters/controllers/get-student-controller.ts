import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { StudentMapper } from "../../application/mappers/student-mapper.ts";
import { queryStudentSchema } from "../../application/validators/student-validator.ts";
import { makeGetStudentUseCase } from "../../infrastructure/factories/make-get-students-use-case.ts";

export async function getStudent(request: FastifyRequest, reply: FastifyReply) {
	const studentQuery = queryStudentSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const getStudentUseCase = makeGetStudentUseCase();

	const { studentsItems } = await getStudentUseCase.execute(studentQuery, user);

	return FastifyResponsePresenter.success(
		reply,
		200,
		"Students found successfully",
		StudentMapper.toManyQueryDTOV2(studentsItems),
	);
}
