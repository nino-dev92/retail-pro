import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as supplierService from "../services/supplier.service";

export const createSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const supplier = await supplierService.createSupplier(req.body);

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  },
);

export const getAllSuppliers = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.max(Number(req.query.limit) || 10, 10);

    const search = req.query.search as string;

    const allSuppliers = await supplierService.findAll(search, page, limit);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: allSuppliers,
    });
  },
);

export const getSupplierbyId = asyncHandler(
  async (req: Request, res: Response) => {
    const supplier = await supplierService.findSupplierById(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Successful",
      data: supplier,
    });
  },
);

export const editSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;
    const edited = await supplierService.updateSupplier(
      req.params.id as string,
      status,
    );

    res.status(200).json({
      success: true,
      message: "Successful",
      data: edited,
    });
  },
);

export const updateSupplierStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const status: boolean = req.body.status;
    const deactivated = await supplierService.updateSupplierStatus(
      req.params.id as string,
      status,
    );

    res.status(200).json({
      success: true,
      message: "Successful",
      data: deactivated,
    });
  },
);
