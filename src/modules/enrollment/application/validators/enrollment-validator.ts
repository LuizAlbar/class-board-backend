import { z } from "zod";
import { Status } from "../../domain/entities/enrollment-entity.ts";

export const createEnrollmentSchema = z.object({
	year: z.int(),
	status: z.enum(Status),
	enrollmentDate: z.date(),
	studentId: z.string(),
	classId: z.string(),
});

export const deleteEnrollmentSchema = z.object({
	id: z.string(),
});

export const updateEnrollmentSchema = z.object({
	id: z.string(),
	year: z.int().optional(),
	status: z.enum(Status).optional(),
	enrollmentDate: z.date().optional(),
	studentId: z.string().optional(),
	classId: z.string().optional(),
});

export const queryEnrollmentSchema = z.object({
	ra: z.string().optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	year: z.number().optional(),
	status: z.enum(Status).optional(),
	enrollmentDate: z.date().optional(),
	studentId: z.string().optional(),
	classId: z.string().optional(),
	page: z.number(),
	limit: z.number(),
});
