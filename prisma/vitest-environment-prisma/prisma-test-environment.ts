import { randomUUID } from "node:crypto";
import type { Environment } from "vitest/environments";
import { env } from "../../src/shared/env/index.ts";

function generateDatabaseTestUrl() {
	const url = new URL(env.DATABASE_URL);
	const schema = randomUUID().replace(/-/g, "_");
	url.searchParams.set("schema", schema);
	return url.toString();
}

export default (<Environment>{
	name: "prisma",
	setup() {
		const databaseUrl = generateDatabaseTestUrl();

		process.env.DATABASE_URL = databaseUrl;

		return {
			teardown() {
				// called after all tests with this env have been run
			},
		};
	},
});
