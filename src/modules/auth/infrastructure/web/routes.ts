import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { authenticate } from "../../adapters/controllers/authenticate-controller.ts";
import { createOrganizationSession } from "../../adapters/controllers/create-organization-session-controller.ts";
import { getProfile } from "../../adapters/controllers/get-profile-controller.ts";
import { refreshToken } from "../../adapters/controllers/refresh-token-controller.ts";
import { register } from "../../adapters/controllers/register-controller.ts";
import {
	authenticateUserSchema,
	createUserSchema,
	membershipAuthenticationSchema,
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

	app.get(
		"/auth/me",
		{
			onRequest: [verifyJWT],
			schema: {
				tags: ["auth"],
				description: "User get profile",
			},
		},
		getProfile,
	);

	app.get(
		"/auth/refresh-token",
		{
			schema: {
				tags: ["auth"],
				description: "User refresh token",
			},
		},
		refreshToken,
	);

	app.patch(
		"/auth/organization",
		{
			onRequest: [verifyJWT],
			schema: {
				tags: ["auth"],
				description: "Create organization session",
				body: membershipAuthenticationSchema,
			},
		},
		createOrganizationSession,
	);
}
