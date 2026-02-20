import { getUserMembership } from "@/shared/middlewares/get-user-membership.ts";
import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createStudent } from "../../adapters/controllers/create-student-controller.ts";
import { deleteStudent } from "../../adapters/controllers/delete-student-controller.ts";
import { getStudent } from "../../adapters/controllers/get-student-controller.ts";
import {
	createStudentSchema,
	deleteStudentSchema,
	queryStudentSchema,
} from "../../application/validators/student-validator.ts";

export async function studentRoutes(app: FastifyZodTypedInstance) {
	app.addHook("preHandler", getUserMembership);

	app.post(
		"/student/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["student"],
				description: "Create student",
				body: createStudentSchema,
			},
		},
		createStudent,
	);

	app.delete(
		"/student/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["student"],
				description: "Delete student",
				body: deleteStudentSchema,
			},
		},
		deleteStudent,
	);

	app.get(
		"/student/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["student"],
				description: "Get student",
				querystring: queryStudentSchema,
			},
		},
		getStudent,
	);
}
