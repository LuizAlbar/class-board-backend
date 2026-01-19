import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createMembership } from "../../adapters/controllers/create-membership.ts";
import { createMembershipSchema } from "../../application/validators/membership-validator.ts";

export async function membershipRoutes(app: FastifyZodTypedInstance) {
	app.post(
		"/membership/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["membership"],
				description: "Create membership",
				body: createMembershipSchema,
			},
		},
		createMembership,
	);
}
