import { z } from "zod";

export const createTeacherSchema = z.object({
	userId: z.string(),
	organizationId: z.string(),
});

export const deleteTeacherSchema = z.object({
	id: z.string(),
});

export const queryTeacherSchema = z.object({
	name: z.string().optional(),
	email: z.string().optional(),
	limit: z.coerce.number(),
	page: z.coerce.number(),
});
