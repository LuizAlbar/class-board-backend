import { getUserMembership } from "@/shared/middlewares/get-user-membership.ts";
import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createTeacher } from "../../adapters/controllers/create-teacher-controller.ts";
import { deleteTeacher } from "../../adapters/controllers/delete-teacher-controller.ts";
import { getTeacher } from "../../adapters/controllers/get-teacher-controller.ts";
import {
	createTeacherSchema,
	deleteTeacherSchema,
	queryTeacherSchema,
} from "../../application/validators/teacher-validator.ts";

export async function teacherRoutes(app: FastifyZodTypedInstance) {
	app.addHook("preHandler", getUserMembership);

	app.post(
		"/teacher/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["teacher"],
				description: "Create teacher",
				body: createTeacherSchema,
			},
		},
		createTeacher,
	);

	app.delete(
		"/teacher/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["teacher"],
				description: "Delete teacher",
				body: deleteTeacherSchema,
			},
		},
		deleteTeacher,
	);

	app.get(
		"/teacher/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["teacher"],
				description: "Get teacher",
				querystring: queryTeacherSchema,
			},
		},
		getTeacher,
	);
}
