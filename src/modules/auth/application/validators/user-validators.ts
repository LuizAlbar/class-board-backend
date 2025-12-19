import { z } from "zod";
import { UserRole } from "../../domain/entities/User.ts";

export const createUserSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(32, { message: "Password cannot exceed 32 characters" })
		.refine((s) => !s.includes(" "), "Password cannot contain spaces"),
	role: z.enum(UserRole),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
