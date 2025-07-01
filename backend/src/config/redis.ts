import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis client
let redisClient: RedisClientType | null = null;

const initRedisClient = async (): Promise<RedisClientType> => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    // Redis error handling
    redisClient.on("error", (err: Error) => {
      console.error("Redis Error:", err);
    });

    // Connect to Redis
    await redisClient.connect();
    console.log("Connected to Redis");

    return redisClient;
  } catch (error) {
    console.error("Redis connection error:", error);
    throw error;
  }
};

// Get Redis client instance
const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error("Redis client not initialized");
  }
  return redisClient;
};

export { initRedisClient, getRedisClient };
