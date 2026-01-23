import z from "zod";

import {
	membershipSchema,
	membershipTypeName,
} from "../models/membership-model.ts";

export const membershipSubject = z.tuple([
	z.union([
		z.literal("create"),
		z.literal("read"),
		z.literal("update"),
		z.literal("manage"),
	]),
	z.union([membershipTypeName, membershipSchema]),
]);

export type MembershipTypeName = z.infer<typeof membershipTypeName>;
export type MembershipSubject = z.infer<typeof membershipSubject>;
