import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { authenticate } from "../../adapters/controllers/authenticate.ts";
import { register } from "../../adapters/controllers/register.ts";
import {
	authenticateUserSchema,
	createUserSchema,
} from "../../application/validators/user-validators.ts";

export async function userRoutes(app: FastifyZodTypedInstance) {
	app.post(
		"/auth/register",
		{
			schema: {
				tags: ["auth"],
				description: "User register",
				body: createUserSchema,
			},
		},
		register,
	);

	app.post(
		"/auth/authenticate",
		{
			schema: {
				tags: ["auth"],
				description: "User authenticate",
				body: authenticateUserSchema,
			},
		},
		authenticate,
	);
}
