import z from "zod";
import { Role } from "../roles.ts";

export const userContextTypeName = z.literal("User");

export const userContextSchema = z.object({
	__typename: userContextTypeName.default("User"),
	userId: z.string(),
	role: z.enum(Role).default(Role.VISITANTE),
	orgId: z.string().optional(),
});

export type UserContext = z.infer<typeof userContextSchema>;
