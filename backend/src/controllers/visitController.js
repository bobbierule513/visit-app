const { updateVisit, getVisitStats } = require("../services/visitService");

/**
 * Update visit count for a country
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const recordVisit = async (req, res, next) => {
  try {
    const { countryCode } = req.params;

    if (!countryCode || countryCode.length < 2) {
      return res.status(400).json({ error: "Valid country code is required" });
    }

    const newCount = await updateVisit(countryCode);

    return res.status(200).json({
      success: true,
      countryCode,
      count: newCount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all visit statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getStats = async (req, res, next) => {
  try {
    const stats = await getVisitStats();

    return res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recordVisit,
  getStats,
};
