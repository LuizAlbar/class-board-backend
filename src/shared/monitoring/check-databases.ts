import { prisma } from "../database/prisma.ts";
import { redis } from "../database/redis.ts";

export class ServiceUnreachable extends Error {
	constructor() {
		super("Can't reach service");
	}
}
export async function getPrismaLatency(): Promise<string> {
	try {
		const initialTime = performance.now();
		await prisma.$queryRaw`SELECT 1`;
		const endTime = performance.now();

		return `${Math.round(endTime - initialTime)}ms`.toString();
	} catch {
		throw new ServiceUnreachable();
	}
}

export async function getRedisLatency(): Promise<string> {
	try {
		const initialTime = performance.now();
		await redis.ping();
		const endTime = performance.now();

		return `${Math.round(endTime - initialTime)}ms`.toString();
	} catch {
		throw new ServiceUnreachable();
	}
}
