import z from "zod";
import { Period } from "@/modules/class/domain/entities/class-entity.ts";

export const classTypeName = z.literal("Class");

export const classSchema = z.object({
	__typename: classTypeName,
	id: z.string(),
	name: z.string(),
	year: z.number(),
	period: z.enum(Period),
	organizationId: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
});

export type Class = z.infer<typeof classSchema>;
