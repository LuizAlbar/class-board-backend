import { Redis } from "ioredis";

export const redis = new Redis({ port: 6739 });

redis.on("connect", () => {
	console.log("Connected to Redis");
});

redis.on("error", (err) => {
	console.error("Redis Error: ", err);
});
