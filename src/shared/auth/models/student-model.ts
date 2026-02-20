import z from "zod";

export const studentTypeName = z.literal("Student");

export const studentSchema = z.object({
	__typename: studentTypeName,
	id: z.string(),
	userId: z.string(),
	ra: z.string(),
	dateOfBirth: z.date(),
	organizationId: z.string(),
});

export type Student = z.infer<typeof studentSchema>;
