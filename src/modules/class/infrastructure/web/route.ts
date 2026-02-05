import { getUserMembership } from "@/shared/middlewares/get-user-membership.ts";
import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createClass } from "../../adapters/controllers/create-class-controller.ts";
import { createClassSchema } from "../../application/validators/class-validator.ts";

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
}
