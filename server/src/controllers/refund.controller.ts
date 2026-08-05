import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as refundService from "../services/refund.service";
import logger from "../logger/logger";

export const handleRefund = asyncHandler(
  async (req: Request, res: Response) => {
    const refund = await refundService.refundSale(req.user!.userId, req.body);

    logger.info(`Refund processed`);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: refund,
    });
  },
);

export const getAllRefunds = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 1;
    const from = req.query.date as string;
    const to = req.query.date as string;

    const refunds = await refundService.showAllRefunds(page, limit, from, to);
  },
);
