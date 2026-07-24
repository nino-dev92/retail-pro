import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as dashboardService from "../services/dashboard.service";

export const dashboard = asyncHandler(async (req: Request, res: Response) => {
  const dashboard = await dashboardService.getDashboard();

  res.status(200).json({
    success: true,
    message: "Dashboard retrieved successfully",
    data: dashboard,
  });
});
