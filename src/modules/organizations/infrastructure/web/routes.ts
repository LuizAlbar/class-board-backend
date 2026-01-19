import { verifyJWT } from "@/shared/middlewares/verify-jwt.ts";
import type { FastifyZodTypedInstance } from "@/shared/utils/@types/fastify-zod-type-provider.js";
import { createOrganization } from "../../adapters/controllers/create-organization.ts";
import { createOrganizationSchema } from "../../application/validators/organization-validator.ts";

export async function organizationRoutes(app: FastifyZodTypedInstance) {
	app.post(
		"/organization/",
		{
			preHandler: [verifyJWT],
			schema: {
				tags: ["organization"],
				description: "Create organization",
				body: createOrganizationSchema,
			},
		},
		createOrganization,
	);
}
