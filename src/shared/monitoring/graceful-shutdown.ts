import type { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma.ts";
import { redis } from "../database/redis.ts";

export async function gracefulShutdown(appInstance: FastifyInstance) {
	try {
		await appInstance.close();
		console.log("Server closed gracefully");

		await prisma.$disconnect();
		console.log("Prisma connection closed gracefully");

		await redis.quit();
		console.log("Redis connection closed gracefully");

		process.exit(0);
	} catch (err) {
		setTimeout(() => {
			console.error(`Error: ${err}... => forcing shutdown`);
			process.exit(1);
		}, 30000);
	}
}
