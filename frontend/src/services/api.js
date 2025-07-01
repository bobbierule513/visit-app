import axios from "axios";

// Base URL for API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Record a visit for a country
 * @param {string} countryCode - ISO country code (e.g., 'us', 'ru')
 * @returns {Promise} - Promise with response data
 */
export const recordVisit = async (countryCode) => {
  try {
    const response = await api.get(`/visits/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error("Error recording visit:", error);
    throw error;
  }
};

/**
 * Get all visit statistics
 * @returns {Promise} - Promise with statistics data
 */
export const getVisitStats = async () => {
  try {
    const response = await api.get("/stats");
    return response.data;
  } catch (error) {
    console.error("Error getting visit stats:", error);
    throw error;
  }
};

export default {
  recordVisit,
  getVisitStats,
};
