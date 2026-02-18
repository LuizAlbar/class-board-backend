import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import esbuild from "esbuild";

const distPath = "./dist";

if (existsSync(distPath)) {
	rmSync(distPath, { recursive: true, force: true });
}

await esbuild.build({
	entryPoints: ["src/server.ts"],
	bundle: true,
	minify: true,
	sourcemap: true,
	outfile: "dist/server.cjs",
	format: "cjs",
	target: "node20",
	external: [
		"@prisma/client",
		"@fastify/swagger-ui",
		"@fastify/swagger",
		"pino-pretty",
	],
	logLevel: "info",
	platform: "node",
	tsconfig: "tsconfig.json",
	alias: {
		"@": path.resolve(process.cwd(), "./src"),
	},
});
