import type { FastifyReply } from "fastify";
import { env } from "@/shared/env/index.ts";

export function createJWTCookies(
	reply: FastifyReply,
	token: string,
	refreshToken: string,
) {
	reply
		.setCookie("token", token, {
			path: "/",
			httpOnly: true,
			secure: env.NODE_ENV === "prod",
			maxAge: 900,
		})
		.send();

	reply
		.setCookie("refreshToken", refreshToken, {
			path: "/",
			httpOnly: true,
			secure: env.NODE_ENV === "prod",
			maxAge: 60 * 60 * 24 * 7,
		})
		.send();
}
