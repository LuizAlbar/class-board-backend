import { Redis } from "ioredis";
import { env } from "../env/index.ts";

export const redis = new Redis(env.REDIS_URL);

export function setupRedisLogging(app: any) {
	redis.monitor((err, monitor) => {
		if (err) return;

		monitor?.on("monitor", (_time, args, _source, _db) => {
			app.log.debug(
				{
					type: "redis",
					command: args[0],
					params: args.slice(1),
				},
				`redis:query: ${args.join(" ")}`,
			);
		});
	});
}
