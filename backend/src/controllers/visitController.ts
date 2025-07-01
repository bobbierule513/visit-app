import { Request, Response, NextFunction } from "express";
import { updateVisit, getVisitStats } from "../services/visitService";

/**
 * Update visit count for a country
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const recordVisit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { countryCode } = req.params;

    if (!countryCode || countryCode.length < 2) {
      res.status(400).json({ error: "Valid country code is required" });
      return;
    }

    const newCount = await updateVisit(countryCode);

    res.status(200).json({
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
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await getVisitStats();

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

export { recordVisit, getStats };
