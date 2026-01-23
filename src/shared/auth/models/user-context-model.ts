import z from "zod";
import { Role } from "../roles.ts";

export const userContextTypeName = z.literal("User");

export const userContextSchema = z.object({
	__typename: userContextTypeName,
	id: z.string(),
	orgId: z.string().optional(),
	role: z.enum(Role).default(Role.VISITANTE),
});

export type UserContext = z.infer<typeof userContextSchema>;
