import z from "zod";

import { classSchema, classTypeName } from "../models/class-model.ts";

export const classSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("delete"),
		z.literal("add_member"),
		z.literal("remove_member"),
		z.literal("manage"),
	]),
	z.union([classTypeName, classSchema]),
]);

export type ClassypeName = z.infer<typeof classTypeName>;
export type ClassSubject = z.infer<typeof classSubject>;
