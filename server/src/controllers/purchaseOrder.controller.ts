import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as purchaseOrderService from "../services/purchaseOrder.service";

export const addPurchaseOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.user!.userId as string;
    const purchaseOrder = await purchaseOrderService.createPurchaseOrder(
      id,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Created Successfully",
      data: purchaseOrder,
    });
  },
);

export const getAllPurchaseOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const search = (req.query.search as string) || "";
    const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.page) : 10;

    const AllPurchaseOrders = await purchaseOrderService.findAllPurchaseOrders(
      search,
      page,
      limit,
    );
    res.status(200).json({
      success: true,
      message: "Successful",
      data: AllPurchaseOrders,
    });
  },
);

export const getPurchaseOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const purchaseOrder = await purchaseOrderService.findPurchaseOrderById(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Successful",
      data: purchaseOrder,
    });
  },
);
