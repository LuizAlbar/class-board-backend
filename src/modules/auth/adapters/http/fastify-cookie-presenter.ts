import type { FastifyReply } from "fastify";
import { env } from "@/shared/env/index.ts";

export class FastifyAuthCookiePresenter {
	static setAuthCookies(
		reply: FastifyReply,
		accessToken: string,
		refreshToken: string,
	) {
		reply.setCookie("__cb.auth_session", accessToken, {
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
			signed: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: "strict",
		});
	}

	static clearAuthCookies(reply: FastifyReply) {
		reply.clearCookie("__cb.auth_session", { path: "/" });
		reply.clearCookie("refreshToken", { path: "/" });
	}

	static refreshAccessToken(reply: FastifyReply, accessToken: string) {
		reply.setCookie("__cb.auth_session", accessToken, {
			path: "/",
			httpOnly: true,
			secure: env.NODE_ENV === "prod",
			maxAge: 60 * 15,
			sameSite: "strict",
		});
	}

	static organizationAccessToken(reply: FastifyReply, accessToken: string) {
		reply.setCookie("__cb.org_session", accessToken, {
			path: "/",
			httpOnly: true,
			secure: env.NODE_ENV === "prod",
			maxAge: 60 * 15,
			sameSite: "strict",
		});
	}
}
