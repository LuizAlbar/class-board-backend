import { buildApp } from "./app";

async function startServer() {
	const app = await buildApp();

	try {
		await app
			.listen({
				port: 3000,
				host: "0.0.0.0",
			})
			.then(() => {
				console.log(`🚀 Server running at http://localhost:3000`);
				console.log(
					`📚 Docs available at http://localhost:3000/docs and http://localhost:3000/scalar/docs`,
				);
			});
	} catch (error) {
		app.log.error(error);
	}
}

startServer();
