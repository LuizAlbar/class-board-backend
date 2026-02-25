import z from "zod";
import { Status } from "@/modules/enrollment/domain/entities/enrollment-entity.ts";

export const enrollmentTypeName = z.literal("Enrollment");

export const enrollmentSchema = z.object({
	__typename: enrollmentTypeName,
	id: z.string(),
	year: z.int(),
	status: z.enum(Status),
	enrollmentDate: z.date(),
	studentId: z.string(),
	classId: z.string(),
});

export type Enrollment = z.infer<typeof enrollmentSchema>;
