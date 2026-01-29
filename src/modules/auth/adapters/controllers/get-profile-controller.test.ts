import type { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "@/app.ts";
import { createAndAuthenticateUser } from "@/shared/utils/test/create-and-authenticate-user.ts";

let app: FastifyInstance;
describe("Get Profile (e2e)", () => {
	beforeAll(async () => {
		app = await buildApp();
		await app.ready();
	});
	afterAll(async () => {
		app.close();
	});

	it("should be able to get user profile", async () => {
		const { authResponse } = await createAndAuthenticateUser(app);

		const cookies = authResponse.get("Set-Cookie") || [];

		const profileResponse = await request(app.server)
			.get("/auth/me")
			.set("Cookie", cookies);

		expect(profileResponse.statusCode).toEqual(200);
	});
});
