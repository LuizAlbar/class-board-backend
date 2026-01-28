import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths({ root: "./" })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		projects: [
			{
				plugins: [tsconfigPaths({ root: "./" })],
				resolve: {
					alias: {
						"@": path.resolve(__dirname, "./src"),
					},
				},
				test: {
					name: "unit",
					include: ["src/modules/**/*.spec.ts"],
					environment: "node",
				},
			},
			{
				plugins: [tsconfigPaths({ root: "./" })],
				resolve: {
					alias: {
						"@": path.resolve(__dirname, "./src"),
					},
				},
				test: {
					name: "e2e",
					include: ["src/modules/**/adapters/controllers/**/*.test.ts"],
					environment: "node",
				},
			},
		],
	},
});
