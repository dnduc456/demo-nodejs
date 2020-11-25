import Redis from "ioredis";
import config from "@config/config";

/**
 * Global redis connection, will use it through the app.
 */
export const CommonRedisInstance = new Redis(config.redisUri);
