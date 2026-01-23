import z from "zod";

import {
	userContextSchema,
	userContextTypeName,
} from "../models/user-context-model.ts";

export const userContextSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("manage"),
	]),
	z.union([userContextTypeName, userContextSchema]),
]);

export type UserContextTypeName = z.infer<typeof userContextTypeName>;
export type UserContextSubject = z.infer<typeof userContextSubject>;
