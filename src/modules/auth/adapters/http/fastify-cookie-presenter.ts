import type { FastifyReply } from "fastify";
import { env } from "@/shared/env/index.ts";

export class FastifyAuthCookiePresenter {
	static setAuthCookies(
		reply: FastifyReply,
		accessToken: string,
		refreshToken: string,
	) {
		reply.setCookie("token", accessToken, {
			path: "/",
			httpOnly: true,
			secure: env.NODE_ENV === "prod",
			maxAge: 60 * 15,
			sameSite: "strict",
		});

		reply.setCookie("refreshToken", refreshToken, {
			path: "/",
			httpOnly: true,
			secure: env.NODE_ENV === "prod",
			maxAge: 60 * 60 * 24 * 7,
			sameSite: "strict",
		});
	}

	static clearAuthCookies(reply: FastifyReply) {
		reply.clearCookie("token", { path: "/" });
		reply.clearCookie("refreshToken", { path: "/" });
	}
}
