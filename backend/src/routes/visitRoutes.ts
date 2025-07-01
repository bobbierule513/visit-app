import express, { Router } from "express";
import { recordVisit, getStats } from "../controllers/visitController";

const router: Router = express.Router();

/**
 * @route   GET /api/visits/:countryCode
 * @desc    Record a visit from a specific country
 * @access  Public
 */
router.get("/visits/:countryCode", recordVisit);

/**
 * @route   GET /api/stats
 * @desc    Get all visit statistics
 * @access  Public
 */
router.get("/stats", getStats);

export default router;
