import z from "zod";

import { studentSchema, studentTypeName } from "../models/student-model.ts";

export const studentSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("delete"),
		z.literal("manage"),
	]),
	z.union([studentTypeName, studentSchema]),
]);

export type StudentTypeName = z.infer<typeof studentTypeName>;
export type StudentSubject = z.infer<typeof studentSubject>;
