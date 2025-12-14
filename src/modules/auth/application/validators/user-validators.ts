import { z } from "zod";
import { UserRole } from "../../domain/entities/User.ts";

export const createUserSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
	role: z.enum(UserRole),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
