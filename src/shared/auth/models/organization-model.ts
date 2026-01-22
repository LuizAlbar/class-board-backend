import z from "zod";

export const organizationTypeName = z.literal("Organization");

export const organizationSchema = z.object({
	__typename: organizationTypeName,
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	created_at: z.date(),
});

export type Organization = z.infer<typeof organizationSchema>;
