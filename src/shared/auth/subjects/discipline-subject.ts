import z from "zod";

import {
	disciplineSchema,
	disciplineTypeName,
} from "../models/discipline-model.ts";

export const disciplineSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("delete"),
		z.literal("manage"),
	]),
	z.union([disciplineTypeName, disciplineSchema]),
]);

export type DisciplineTypeName = z.infer<typeof disciplineTypeName>;
export type DisciplineSubject = z.infer<typeof disciplineSubject>;
