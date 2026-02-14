import z from "zod";

import {
	teacherAssignmentSchema,
	teacherAssignmentTypeName,
} from "../models/teacher-assignment-model.ts";

export const teacherAssignmentSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("delete"),
		z.literal("manage"),
	]),
	z.union([teacherAssignmentTypeName, teacherAssignmentSchema]),
]);

export type TeacherAssignmentTypeName = z.infer<
	typeof teacherAssignmentTypeName
>;
export type TeacherSubjectSubject = z.infer<typeof teacherAssignmentSubject>;
