import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest/environments";
import { env } from "@/shared/env/index.ts";

function generateDatabaseUrl(schema: string) {
	const url = new URL(env.DATABASE_URL);

	url.searchParams.set("schema", schema);

	return url.toString();
}
export default (<Environment>{
	name: "custom",
	viteEnvironment: "ssr",
	async setupVM() {
		const vm = await import("node:vm");
		const context = vm.createContext();
		return {
			getVmContext() {
				return context;
			},
			teardown() {},
		};
	},
	setup() {
		const schema = randomUUID();
		const databaseUrl = generateDatabaseUrl(schema);

		env.DATABASE_URL = databaseUrl;

		execSync("pnpm dlx prisma migrate deploy");
		return {
			teardown() {
				// called after all tests with this env have been run
			},
		};
	},
});
