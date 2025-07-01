import axios from "axios";

// Define response types
interface VisitResponse {
  success: boolean;
  countryCode: string;
  count: number;
}

interface StatsResponse {
  [countryCode: string]: number;
}

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
 * @returns {Promise<VisitResponse>} - Promise with response data
 */
export const recordVisit = async (
  countryCode: string
): Promise<VisitResponse> => {
  try {
    const response = await api.get<VisitResponse>(`/visits/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error("Error recording visit:", error);
    throw error;
  }
};

/**
 * Get all visit statistics
 * @returns {Promise<StatsResponse>} - Promise with statistics data
 */
export const getVisitStats = async (): Promise<StatsResponse> => {
  try {
    const response = await api.get<StatsResponse>("/stats");
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
