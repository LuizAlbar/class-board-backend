import fastifyCookie from "@fastify/cookie";
import { fastifyCors } from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastifyJWT from "@fastify/jwt";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z, { ZodError } from "zod";
import { prisma } from "@/shared/database/prisma.ts";
import { userRoutes } from "./modules/auth/infrastructure/web/routes.ts";
import { membershipRoutes } from "./modules/membership/infrastructure/web/routes.ts";
import { organizationRoutes } from "./modules/organizations/infrastructure/web/routes.ts";
import { setupRedisLogging } from "./shared/database/redis.ts";
import { env } from "./shared/env/index.ts";
import { BaseError } from "./shared/errors/base-error.ts";
import { UnauthorizedError } from "./shared/errors/http-errors.ts";
import { auth } from "./shared/middlewares/auth.ts";
import { healthCheck } from "./shared/monitoring/health-check.ts";
import { FastifyResponsePresenter } from "./shared/utils/response-handler/fastify-response-presenter.ts";

export async function buildApp() {
	// #----- App -----#

	const app = fastify({
		logger: {
			level: "debug",
			serializers: {
				req(request) {
					return {
						method: request.method,
						url: request.url,
					};
				},
			},
			transport: {
				target: "pino-pretty",
				options: {
					colorize: true,
					translateTime: "HH:MM:ss Z",
					ignore: "pid,hostname",
					include: "level,time,msg,query,params",
				},
			},
		},
	}).withTypeProvider<ZodTypeProvider>();

	setupRedisLogging(app);

	// #----- ErrorHandler -----#

	app.setErrorHandler((error, _request, reply) => {
		if (error instanceof ZodError) {
			return reply
				.status(400)
				.send({ message: "Invalid Data Input", issues: z.treeifyError(error) });
		}

		if (error instanceof BaseError) {
			return FastifyResponsePresenter.error(
				reply,
				error.statusCode,
				error.message,
				error.details || {},
			);
		}

		app.log.debug(error);

		return reply.status(500).send({ message: "Internal server error" });
	});

	// #----- JWT -----#

	app.register(fastifyJWT, {
		secret: env.JWT_SECRET,
		cookie: {
			cookieName: "__cb.auth_session",
			signed: false,
		},
	});

	// #----- Cookie -----#

	app.register(fastifyCookie, {
		secret: env.JWT_SECRET,
	});

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

	// #----- Helmet -----#

	app.register(helmet, {});

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

	// #----- Routes -----#

	app.register(healthCheck);
	app.register(userRoutes);

	app.decorateRequest("getCurrentOrganizationId");
	app.decorateRequest("getCurrentMembership");

	app.addHook("preHandler", async (request) => {
		request.getCurrentOrganizationId = () => {
			const { orgId } = request.user.sub;

			if (!orgId) {
				throw new Error("No org error");
			}

			return orgId;
		};

		request.getCurrentMembership = async () => {
			const { id: userId } = request.user.sub;
			const organizationId = request.getCurrentOrganizationId();

			const member = await prisma.membership.findUnique({
				where: {
					userId_organizationId: {
						userId,
						organizationId,
					},
				},
			});

			if (!member) {
				throw new UnauthorizedError();
			}

			return {
				userId: member.userId,
				role: member.role,
			};
		};
	});
	app.register(organizationRoutes);
	app.register(membershipRoutes);

	return app;
}
