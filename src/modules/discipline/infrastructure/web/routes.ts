import { getUserMembership } from "@/shared/middlewares/get-user-membership.ts";
import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createDiscipline } from "../../adapters/controllers/create-discipline-controller.ts";
import { deleteDiscipline } from "../../adapters/controllers/delete-discipline-controller.ts";
import { updateDiscipline } from "../../adapters/controllers/update-discipline-controller.ts";
import {
	createDisciplineSchema,
	deleteDisciplineSchema,
	updateDisciplineSchema,
} from "../../application/validators/discipline-validator.ts";

export async function disciplineRoutes(app: FastifyZodTypedInstance) {
	app.addHook("preHandler", getUserMembership);
	app.post(
		"/discipline/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["discipline"],
				description: "Create discipline",
				body: createDisciplineSchema,
			},
		},
		createDiscipline,
	);

	app.patch(
		"/discipline/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["discipline"],
				description: "Update discipline",
				body: updateDisciplineSchema,
			},
		},
		updateDiscipline,
	);

	app.delete(
		"/discipline/",
		{
			preHandler: [verifyJWT],

			schema: {
				tags: ["discipline"],

				description: "Delete discipline",

				body: deleteDisciplineSchema,
			},
		},
		deleteDiscipline,
	);
}
