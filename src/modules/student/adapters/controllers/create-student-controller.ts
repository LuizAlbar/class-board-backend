import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { StudentMapper } from "../../application/mappers/student-mapper.ts";
import { createStudentSchema } from "../../application/validators/student-validator.ts";
import { makeCreateStudentUseCase } from "../../infrastructure/factories/make-create-student-use-case.ts";

export async function createStudent(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const studentBody = createStudentSchema.parse(request.body);

	const user = await request.getCurrentMembership();

	const createStudentUseCase = makeCreateStudentUseCase();

	const { studentItem } = await createStudentUseCase.execute(studentBody, user);

	return FastifyResponsePresenter.success(
		reply,
		201,
		"Student created successfully",
		StudentMapper.toDTO(studentItem),
	);
}
