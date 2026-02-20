import { z } from "zod";

export const createStudentSchema = z.object({
	userId: z.string(),
	ra: z.string(),
	dateOfBirth: z.date(),
	organizationId: z.string(),
});

export const deleteStudentSchema = z.object({
	id: z.string(),
});

export const queryStudentSchema = z.object({
	name: z.string().optional(),
	email: z.string().optional(),
	ra: z.string().optional(),
	limit: z.coerce.number(),
	page: z.coerce.number(),
});
