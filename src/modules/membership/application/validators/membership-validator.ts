import { z } from "zod";
import { Role } from "../../domain/entities/Membership.ts";

export const createMembershipSchema = z.object({
	role: z.enum(Role),
	userId: z.string(),
	orgId: z.string(),
});
