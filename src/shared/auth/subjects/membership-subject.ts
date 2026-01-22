import z from "zod";

import {
	membershipSchema,
	membershipTypeName,
} from "../models/membership-model.ts";

export const memberSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("manage"),
	]),
	z.union([membershipTypeName, membershipSchema]),
]);

export type UserTypeName = z.infer<typeof membershipTypeName>;
export type UserSubject = z.infer<typeof memberSubject>;
