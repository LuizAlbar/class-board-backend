import type { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "@/app.ts";

let app: FastifyInstance;
describe("Authenticate (e2e)", () => {
	beforeAll(async () => {
		app = await buildApp();
		await app.ready();
	});
	afterAll(async () => {
		app.close();
	});

	it("should be able to authenticate", async () => {
		await request(app.server).post("/auth/register").send({
			name: "Luiz Gustavo",
			email: "luiz@example.com",
			password: "admin123",
		});

		const response = await request(app.server)
			.post("/auth/authenticate")
			.send({ email: "luiz@example.com", password: "admin123" });

		const cookies = response.get("Set-Cookie");

		expect(response.statusCode).toEqual(200);
		expect(cookies).toBeDefined();
	});
});
