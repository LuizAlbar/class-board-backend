import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest/environments";
import { prisma } from "@/shared/database/prisma.ts";
import { env } from "../../src/shared/env/index.ts";

function generateDatabaseTestUrl(schema: string) {
	const url = new URL(env.DATABASE_URL);

	url.searchParams.set("schema", schema);
	return url.toString();
}

export default (<Environment>{
	name: "prisma",
	viteEnvironment: "ssr",
	setup() {
		console.log("Prisma environment initialized");
		const schema = randomUUID().replace(/-/g, "_");
		const databaseUrl = generateDatabaseTestUrl(schema);

		process.env.DATABASE_URL = databaseUrl;
		console.log("Schema created! Starting migrate deploy");

		execSync("npx prisma migrate deploy", { stdio: "inherit" });
		console.log(process.env.DATABASE_URL);

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				);
				console.log("Environment disconnected");

				await prisma.$disconnect();
			},
		};
	},
});
