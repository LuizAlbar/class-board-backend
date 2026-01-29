import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await request(app.server).post("/auth/register").send({
		name: "Luiz Gustavo",
		email: "luiz@example.com",
		password: "admin123",
	});

	const authResponse = await request(app.server)
		.post("/auth/authenticate")
		.send({ email: "luiz@example.com", password: "admin123" });

	return authResponse;
}
