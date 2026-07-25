import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as featureAdjustmentService from "../services/inventoryAdjustment.service";

export const createInventoryAdjustment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const data = req.body;

    const featureAdjustments =
      await featureAdjustmentService.addFeatureAdjustment(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Successful",
      data: featureAdjustments,
    });
  },
);

export const getAllInventoryAdjustments = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, from, to } = req.query;

    const featureAdjustment = await featureAdjustmentService.getAllAdjustments(
      Number(page),
      Number(limit),
      from as string,
      to as string,
    );
    res.status(200).json({
      success: true,
      message: "Successful",
      data: featureAdjustment,
    });
  },
);

export const findAdjustmentById = asyncHandler(
  async (req: Request, res: Response) => {
    const adjustment = await featureAdjustmentService.getAdjustmentById(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Successful",
      data: adjustment,
    });
  },
);
