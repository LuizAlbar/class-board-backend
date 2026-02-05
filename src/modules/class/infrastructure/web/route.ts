import { getUserMembership } from "@/shared/middlewares/get-user-membership.ts";
import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createClass } from "../../adapters/controllers/create-class-controller.ts";
import { updateClass } from "../../adapters/controllers/update-class-controller.ts";
import {
	createClassSchema,
	updateClassSchema,
} from "../../application/validators/class-validator.ts";

export async function classRoutes(app: FastifyZodTypedInstance) {
	app.addHook("preHandler", getUserMembership);
	app.post(
		"/class/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["class"],
				description: "Create class",
				body: createClassSchema,
			},
		},
		createClass,
	);

	app.patch(
		"/class/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["class"],
				description: "Update class",
				body: updateClassSchema,
			},
		},
		updateClass,
	);
}
