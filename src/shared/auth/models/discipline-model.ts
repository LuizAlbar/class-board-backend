import z from "zod";

export const disciplineTypeName = z.literal("Discipline");

export const disciplineSchema = z.object({
	__typename: disciplineTypeName,
	id: z.string(),
	name: z.string(),
	description: z.string(),
});

export type Discipline = z.infer<typeof disciplineSchema>;
