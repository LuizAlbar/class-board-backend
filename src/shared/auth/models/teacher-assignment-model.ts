import z from "zod";

export const teacherAssignmentTypeName = z.literal("TeacherAssignment");

export const teacherAssignmentSchema = z.object({
	__typename: teacherAssignmentTypeName,
	id: z.string(),
	workload: z.number(),
	classId: z.string(),
	teacherId: z.string(),
	disciplineId: z.string(),
});

export type TeacherAssignment = z.infer<typeof teacherAssignmentSchema>;
