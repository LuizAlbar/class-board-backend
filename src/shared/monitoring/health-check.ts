import z from "zod";
import { env } from "../env/index.ts";
import type { FastifyZodTypedInstance } from "../utils/@types/fastify-zod-type-provider.js";
import { formattedMemoryUsage, formatUptime } from "../utils/format/format.ts";
import { FastifyResponsePresenter } from "../utils/response-handler/fastify-response-presenter.ts";
import {
	getPrismaLatency,
	getRedisLatency,
	ServiceUnreachable,
} from "./check-databases.ts";

const healthCheckSchema = z.object({
	status: z.enum(["healthy", "unhealthy", "degraded"]),
	timeStamp: z.iso.datetime(),
	uptime: z.string(),
	environment: z.string(),
	checks: z.object({
		database: z.object({ status: z.enum(["up", "down"]), latency: z.string() }),
		redis: z.object({ status: z.enum(["up", "down"]), latency: z.string() }),
	}),
	system: z.object({ memory_usage: z.string() }),
});

type HealthCheckResponse = z.infer<typeof healthCheckSchema>;
export async function healthCheck(appInstance: FastifyZodTypedInstance) {
	appInstance.get(
		"/health",
		{
			schema: {
				tags: ["health"],
				description: "API Health Check",
			},
		},
		async (_request, reply) => {
			try {
				const uptime = formatUptime(process.uptime());
				const memory = formattedMemoryUsage();

				const databaseLatency = await getPrismaLatency();
				const redisLatency = await getRedisLatency();

				const timeStamp = new Date().toLocaleString("pt-br", {
					timeZone: "America/Sao_Paulo",
				});

				const response: HealthCheckResponse = {
					status: "healthy",
					timeStamp: timeStamp,
					uptime: uptime,
					environment: env.NODE_ENV,
					checks: {
						database: {
							status: "up",
							latency: databaseLatency,
						},
						redis: {
							status: "up",
							latency: redisLatency,
						},
					},
					system: { memory_usage: memory },
				};

				return FastifyResponsePresenter.success(
					reply,
					200,
					"API is healthy",
					response,
				);
			} catch (err) {
				if (err instanceof ServiceUnreachable) {
					return FastifyResponsePresenter.error(
						reply,
						503,
						"One or more services are inaccessible.",
					);
				}
			}
		},
	);
}
