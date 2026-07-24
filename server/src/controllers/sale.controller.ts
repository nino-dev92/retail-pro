import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as saleService from "../services/sale.service";

export const createSale = asyncHandler(async (req: Request, res: Response) => {
  const userId: string = req.user?.userId as string;

  const sale = await saleService.createSale(req.body, userId);

  res.status(201).json({
    success: true,
    message: "Sale Successful",
    data: sale,
  });
});

export const viewAllSales = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, from, to, productId, minTotal, maxTotal } = req.query;

    const sales = await saleService.getAllSales(
      req.user?.userId as string,
      Number(page),
      Number(limit),
      from as string,
      to as string,
      productId as string,
      Number(minTotal),
      Number(maxTotal),
    );

    res.status(200).json({
      success: true,
      message: "Success",
      data: sales.sales,
      pagination: {
        page: page,
        limit: limit,
        total: sales.total,
        totalPages: Math.ceil(sales.total / Number(limit)),
      },
    });
  },
);

export const viewSaleByCashierId = asyncHandler(
  async (req: Request, res: Response) => {
    const sale = await saleService.getSalesByCashier(req.params.id as string);

    res.status(200).json({ success: true, message: "Success", data: sale });
  },
);
