import z from "zod";

import {
	organizationSchema,
	organizationTypeName,
} from "../models/organization-model.ts";

export const organizationSubject = z.tuple([
	z.union([z.literal("create"), z.literal("read"), z.literal("update")]),
	z.union([organizationTypeName, organizationSchema]),
]);

export type OrgnizationTypeName = z.infer<typeof organizationTypeName>;
export type OrgnizationSubject = z.infer<typeof organizationSubject>;
