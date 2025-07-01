const express = require("express");
const router = express.Router();
const { recordVisit, getStats } = require("../controllers/visitController");

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

module.exports = router;
