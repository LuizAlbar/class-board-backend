import { z } from "zod";
import { Period } from "../../domain/entities/class-entity.ts";

export const createClassSchema = z.object({
	name: z.string(),
	year: z.number(),
	period: z.enum(Period),
	organizationId: z.string(),
});
