const request = require("supertest");
const redis = require("redis");
const app = require("../server");

// Mock Redis client
jest.mock("redis", () => {
  const mockHIncrBy = jest.fn().mockResolvedValue(5);
  const mockHGetAll = jest.fn().mockResolvedValue({ us: "5", ru: "10" });

  return {
    createClient: jest.fn().mockReturnValue({
      connect: jest.fn().mockResolvedValue(undefined),
      on: jest.fn(),
      hIncrBy: mockHIncrBy,
      hGetAll: mockHGetAll,
    }),
  };
});

describe("Visit API", () => {
  describe("GET /api/visits/:countryCode", () => {
    it("should record a visit for a valid country code", async () => {
      const res = await request(app).get("/api/visits/us");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("countryCode", "us");
      expect(res.body).toHaveProperty("count");
    });

    it("should return 400 for an invalid country code", async () => {
      const res = await request(app).get("/api/visits/");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /api/stats", () => {
    it("should return visit statistics for all countries", async () => {
      const res = await request(app).get("/api/stats");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("us", 5);
      expect(res.body).toHaveProperty("ru", 10);
    });
  });
});
