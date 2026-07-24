import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as stockMovementService from "../services/stockmovement.service";

export const viewAllStockMovements = asyncHandler(
  async (req: Request, res: Response) => {
    const movements = await stockMovementService.getAllStockMovements();

    res.status(200).json({
      success: true,
      message: "Success",
      data: movements,
    });
  },
);

export const viewStockMovementById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const movement = await stockMovementService.getStockMovementById(id);

    res.status(200).json({
      success: true,
      message: "Success",
      data: movement,
    });
  },
);
