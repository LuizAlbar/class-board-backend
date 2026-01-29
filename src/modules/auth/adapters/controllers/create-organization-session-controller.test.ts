import type { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "@/app.ts";
import { createAndAuthenticateUser } from "@/shared/utils/test/create-and-authenticate-user.ts";
import { createFullMembership } from "@/shared/utils/test/create-full-membership.ts";

let app: FastifyInstance;
describe("Create Organization Session Controller (e2e)", () => {
	beforeAll(async () => {
		app = await buildApp();
		await app.ready();
	});
	afterAll(async () => {
		app.close();
	});

	it("should be able to create organization session", async () => {
		const { createdUser, cookies } = await createAndAuthenticateUser(app);
		const membership = await createFullMembership(createdUser);

		const organizationSession = await request(app.server)
			.patch("/auth/organization")
			.set("Cookie", cookies)
			.send({
				userId: membership.userId,
				organizationId: membership.organizationId,
			});

		expect(organizationSession.statusCode).toEqual(200);
	});
});
