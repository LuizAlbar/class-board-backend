import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { register } from "../../adapters/controllers/register.ts";
import { createUserSchema } from "../../application/validators/user-validators.ts";

export async function userRoutes(app: FastifyZodTypedInstance) {
	app.post(
		"/user/register",
		{
			schema: {
				tags: ["auth"],
				description: "User register",
				body: createUserSchema,
			},
		},
		register,
	);
}
