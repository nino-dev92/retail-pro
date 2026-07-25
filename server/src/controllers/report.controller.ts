import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as reportService from "../services/report.service";

export const salesReport = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const { from, to } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const minTotal = req.query.minTotal ? Number(req.query.minTotal) : undefined;

  const maxTotal = req.query.maxTotal ? Number(req.query.maxTotal) : undefined;

  const report = await reportService.getSalesReport(
    userId,
    Number(page),
    Number(limit),
    from as string,
    to as string,
    Number(minTotal),
    Number(maxTotal),
  );

  res.status(200).json({
    success: true,
    message: "Sales report retrieved successfully",
    data: report,
  });
});

export const purchaseReport = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to, supplier } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const report = await reportService.getPurchaseReport(
      Number(page),
      Number(limit),
      from as string,
      to as string,
      supplier as string,
    );

    res.status(200).json({
      success: true,
      message: "Purchase report retrieved successfully",
      data: report,
    });
  },
);

export const refundReport = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const report = await reportService.getRefundReport(
      Number(page),
      Number(limit),
      from as string,
      to as string,
    );

    res.status(200).json({
      success: true,
      message: "Refund report retrieved successfully",
      data: report,
    });
  },
);

export const inventoryReport = asyncHandler(
  async (req: Request, res: Response) => {
    const report = await reportService.getInventoryReport();

    res.status(200).json({
      success: true,
      message: "Inventory report retrieved successfully",
      data: report,
    });
  },
);

export const stockMovementReport = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const report = await reportService.getStockMovementReport(
      Number(page),
      Number(limit),
      from as string,
      to as string,
    );

    res.status(200).json({
      success: true,
      message: "Stock movement report retrieved successfully",
      data: report,
    });
  },
);

export const summaryReport = asyncHandler(
  async (req: Request, res: Response) => {
    const report = await reportService.getSummaryReport();

    res.status(200).json({
      success: true,
      message: "Summary report retrieved successfully",
      data: report,
    });
  },
);
