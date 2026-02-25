import z from "zod";

import {
	enrollmentSchema,
	enrollmentTypeName,
} from "../models/enrollment-model.ts";

export const enrollmentSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("delete"),
		z.literal("manage"),
	]),
	z.union([enrollmentTypeName, enrollmentSchema]),
]);

export type EnrollmentTypeName = z.infer<typeof enrollmentTypeName>;
export type EnrollmentSubject = z.infer<typeof enrollmentSubject>;
