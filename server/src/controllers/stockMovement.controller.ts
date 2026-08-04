import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as stockMovementService from "../services/stockMovement.service";

export const viewAllStockMovements = asyncHandler(
  async (req: Request, res: Response) => {
    const page =
      Number(req?.query?.page) > 0 ? Number(req.query.page) : undefined;
    const limit =
      Number(req?.query?.limit) > 0 ? Number(req.query.limit) : undefined;
    const from = req?.query?.from as string;
    const to = req?.query?.to as string;
    const movements = await stockMovementService.getAllStockMovements(
      page,
      limit,
      from,
      to,
    );

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
