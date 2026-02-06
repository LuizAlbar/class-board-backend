import z from "zod";

import { teacherSchema, teacherTypeName } from "../models/teacher-model.ts";

export const teacherSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("delete"),
		z.literal("manage"),
	]),
	z.union([teacherTypeName, teacherSchema]),
]);

export type TeacherTypeName = z.infer<typeof teacherTypeName>;
export type TeacherSubject = z.infer<typeof teacherSubject>;
