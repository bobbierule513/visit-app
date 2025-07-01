const { getRedisClient } = require("../config/redis");

// Redis key for storing visit counts
const VISITS_KEY = "website:visits:countries";

/**
 * Update visit count for a country
 * @param {string} countryCode - ISO country code (e.g., 'us', 'ru')
 * @returns {Promise<number>} - New count for the country
 */
const updateVisit = async (countryCode) => {
  try {
    if (!countryCode || typeof countryCode !== "string") {
      throw new Error("Invalid country code");
    }

    // Convert to lowercase for consistency
    const normalizedCountryCode = countryCode.toLowerCase();

    // Increment visit count for the country
    const redisClient = getRedisClient();
    const newCount = await redisClient.hIncrBy(
      VISITS_KEY,
      normalizedCountryCode,
      1
    );

    return newCount;
  } catch (error) {
    console.error(`Error updating visit for ${countryCode}:`, error);
    throw error;
  }
};

/**
 * Get all visit statistics
 * @returns {Promise<Object>} - Object with country codes as keys and visit counts as values
 */
const getVisitStats = async () => {
  try {
    const redisClient = getRedisClient();
    const stats = await redisClient.hGetAll(VISITS_KEY);

    // Convert string values to numbers
    const formattedStats = {};
    for (const [country, count] of Object.entries(stats)) {
      formattedStats[country] = parseInt(count, 10);
    }

    return formattedStats;
  } catch (error) {
    console.error("Error getting visit stats:", error);
    throw error;
  }
};

module.exports = {
  updateVisit,
  getVisitStats,
};
