const redis = require("redis");
require("dotenv").config();

// Create Redis client
let redisClient;

const initRedisClient = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
    });

    // Redis error handling
    redisClient.on("error", (err) => {
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
const getRedisClient = () => {
  if (!redisClient) {
    throw new Error("Redis client not initialized");
  }
  return redisClient;
};

module.exports = {
  initRedisClient,
  getRedisClient,
};
