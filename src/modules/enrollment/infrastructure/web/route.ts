import { getUserMembership } from "@/shared/middlewares/get-user-membership.ts";
import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createEnrollment } from "../../adapters/controllers/create-enrollment-controller.ts";
import { deleteEnrollment } from "../../adapters/controllers/delete-enrollment-controller.ts";
import { getEnrollment } from "../../adapters/controllers/get-enrollment-controller.ts";
import { updateEnrollment } from "../../adapters/controllers/update-enrollment-controller.ts";
import {
	createEnrollmentSchema,
	deleteEnrollmentSchema,
	queryEnrollmentSchema,
	updateEnrollmentSchema,
} from "../../application/validators/enrollment-validator.ts";

export async function enrollmentRoutes(app: FastifyZodTypedInstance) {
	app.addHook("preHandler", getUserMembership);
	app.post(
		"/enrollment/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["enrollment"],
				description: "Create enrollment",
				body: createEnrollmentSchema,
			},
		},
		createEnrollment,
	);

	app.patch(
		"/enrollment/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["enrollment"],
				description: "Update enrollment",
				body: updateEnrollmentSchema,
			},
		},
		updateEnrollment,
	);

	app.delete(
		"/enrollment/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["enrollment"],
				description: "Delete enrollment",
				body: deleteEnrollmentSchema,
			},
		},
		deleteEnrollment,
	);

	app.get(
		"/enrollment",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["enrollment"],
				description: "Query enrollments",
				querystring: queryEnrollmentSchema,
			},
		},
		getEnrollment,
	);
}
