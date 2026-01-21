import z from "zod";

export const successRegister = z.object({
	success: z.boolean().default(true),
	code: z.number(),
	message: z.string(),
	data: z.object({
		id: z.uuid(),
		name: z.string(),
		email: z.email(),
		created_at: z.iso.datetime(),
		updated_at: z.iso.datetime(),
	}),
});

export const successAuthenticate = z.object({
	success: z.boolean().default(true),
	code: z.number(),
	message: z.string(),
	data: z.object({
		id: z.uuid(),
		name: z.string(),
		email: z.email(),
		created_at: z.iso.datetime(),
		updated_at: z.iso.datetime(),
	}),
});

export const successGetProfile = z.object({
	success: z.boolean().default(true),
	code: z.number(),
	message: z.string(),
	data: z.object({
		id: z.uuid(),
		name: z.string(),
		email: z.email(),
		created_at: z.iso.datetime(),
		updated_at: z.iso.datetime(),
	}),
});

export const successRefreshToken = z.object({
	success: z.boolean().default(true),
	code: z.number(),
	message: z.string(),
});

export const successAuthOrg = z.object({
	success: z.boolean().default(true),
	code: z.number(),
	message: z.string(),
});

export const errorResponse = z.object({
	success: z.boolean().default(false),
	code: z.number(),
	error: z.string(),
});
