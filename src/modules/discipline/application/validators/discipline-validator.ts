import { z } from "zod";

export const createDisciplineSchema = z.object({
	name: z.string(),
	description: z.string(),
});

export const updateDisciplineSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
	description: z.string().optional(),
});

export const deleteDisciplineSchema = z.object({
	id: z.string(),
});

export const queryDisciplineSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	limit: z.number(),
	page: z.number(),
});
