import { z } from "zod";
import { Role } from "../../domain/entities/membership-entity.ts";

export const createMembershipSchema = z.object({
	role: z.enum(Role),
	userId: z.string(),
	organizationId: z.string(),
});
