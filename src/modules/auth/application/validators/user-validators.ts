import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(32, { message: "Password cannot exceed 32 characters" })
		.refine((s) => !s.includes(" "), "Password cannot contain spaces"),
});

export const authenticateUserSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.max(32, { message: "Password cannot exceed 32 characters" })
		.refine((s) => !s.includes(" "), "Password cannot contain spaces"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
