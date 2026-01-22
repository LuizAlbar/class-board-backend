import z from "zod";
import { Role } from "../roles.ts";

export const membershipTypeName = z.literal("Membership");

export const membershipSchema = z.object({
	__typename: membershipTypeName,
	id: z.string(),
	role: z.enum(Role),
	userId: z.string(),
	organizationId: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
});

export type Membership = z.infer<typeof membershipSchema>;
