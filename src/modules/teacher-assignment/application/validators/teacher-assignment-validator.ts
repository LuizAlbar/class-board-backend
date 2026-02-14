import { z } from "zod";

export const createTeacherAssignmentSchema = z.object({
	workload: z.number(),
	teacherId: z.string(),
	classId: z.string(),
	disciplineId: z.string(),
});

export const updateTeacherAssignmentSchema = z.object({
	id: z.string(),
	workload: z.number().optional(),
	teacherId: z.string().optional(),
	classId: z.string().optional(),
	disciplineId: z.string().optional(),
});
