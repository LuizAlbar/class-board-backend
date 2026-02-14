import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/server.ts"],
	format: ["cjs"],
	shims: true,
	dts: true,
	clean: true,
});
