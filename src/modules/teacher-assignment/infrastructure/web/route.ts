import { getUserMembership } from "@/shared/middlewares/get-user-membership.ts";
import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createTeacherAssignment } from "../../adapters/controllers/create-teacher-assignment-controller.ts";
import { updateTeacherAssignment } from "../../adapters/controllers/update-teacher-assignment-controller.ts";
import {
	createTeacherAssignmentSchema,
	updateTeacherAssignmentSchema,
} from "../../application/validators/teacher-assignment-validator.ts";

export async function teacherAssignmentRoutes(app: FastifyZodTypedInstance) {
	app.addHook("preHandler", getUserMembership);
	app.post(
		"/teacher-assignment/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["teacher-assignment"],
				description: "Create teacher assignment",
				body: createTeacherAssignmentSchema,
			},
		},
		createTeacherAssignment,
	);

	app.patch(
		"/teacher-assignment/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["teacher-assignment"],
				description: "Update teacher assignment",
				body: updateTeacherAssignmentSchema,
			},
		},
		updateTeacherAssignment,
	);
}
