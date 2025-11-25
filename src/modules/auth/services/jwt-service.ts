import type { FastifyInstance } from "fastify";

export function createJWT(app: FastifyInstance, payload: any) {
	const token = app.jwt.sign(payload, {
		expiresIn: "15 minutes",
	});

	const refreshToken = app.jwt.sign(payload, {
		expiresIn: "7d",
	});

	return { token, refreshToken };
}
