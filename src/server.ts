import { buildApp } from "./app.ts";
import { env } from "./shared/env/index.ts";

async function startServer() {
	const app = await buildApp();
	const PORT = env.PORT;

	try {
		await app
			.listen({
				port: PORT,
				host: "0.0.0.0",
			})
			.then(() => {
				console.log(`🚀 Server running at http://localhost:${PORT}`);
				console.log(
					`📚 Docs available at http://localhost:${PORT}/docs and http://localhost:${PORT}/scalar/docs`,
				);
			});
	} catch (error) {
		app.log.error(error);
	}
}

startServer();
