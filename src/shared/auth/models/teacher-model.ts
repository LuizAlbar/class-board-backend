import z from "zod";

export const teacherTypeName = z.literal("Teacher");

export const teacherSchema = z.object({
	__typename: teacherTypeName,
	id: z.string(),
	userId: z.string(),
	organizationId: z.string(),
});

export type Teacher = z.infer<typeof teacherSchema>;
