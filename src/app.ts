import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import ScalarApiReference from "@scalar/fastify-api-reference";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

export async function buildApp() {
	// #----- App -----#
	const app = fastify({
		logger: true,
	}).withTypeProvider<ZodTypeProvider>();

	// #----- CORS -----#

	app.register(fastifyCors, {
		origin: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		credentials: true,
	});

	// #----- Rate Limit -----#

	await app.register(import("@fastify/rate-limit"), {
		max: 100,
		timeWindow: "1 minute",
		allowList: ["127.0.0.1"],
		addHeaders: {
			"x-ratelimit-limit": true,
			"x-ratelimit-remaining": true,
			"x-ratelimit-reset": true,
			"retry-after": true,
		},
	});

	// #----- Swagger Config -----#

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "ClassBoard API Docs",
				description: "ClassBoard Api",
				version: "0.1.0",
			},
			components: {
				securitySchemes: {
					bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
				},
			},
		},
		transform: jsonSchemaTransform,
	});

	app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});

	app.register(ScalarApiReference, {
		routePrefix: "/scalar/docs",
	});

	return app;
}
