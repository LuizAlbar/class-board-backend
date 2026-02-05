import { z } from "zod";
import { Period } from "../../domain/entities/class-entity.ts";

export const createClassSchema = z.object({
	name: z.string(),
	year: z.number(),
	period: z.enum(Period),
	organizationId: z.string(),
});

export const updateClassSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
	year: z.number().optional(),
	period: z.enum(Period).optional(),
});
