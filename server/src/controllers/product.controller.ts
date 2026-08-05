import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as productService from "../services/product.service";
import logger from "../logger/logger";

export const createNewProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const userId = req.user?.userId;

    const productData = { ...data, createdBy: userId };

    const newProduct = await productService.addProduct(productData);

    logger.info(`Product ${newProduct.name} created`);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  },
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search as string) || undefined;
    const category = (req.query.category as string) || undefined;

    const minPrice =
      req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;

    const maxPrice =
      req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;

    const allProducts = await productService.findAllProducts(
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice,
    );

    res.status(200).json({
      success: true,
      message: "All products retrieved successfully",
      data: allProducts.productDTO,
      pagination: {
        page: page,
        limit: limit,
        total: allProducts.totalProducts,
        totalPages: Math.ceil(allProducts.totalProducts / limit),
      },
    });
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const product = await productService.findProductById(id);

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  },
);

export const updateProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const data = req.body;

    const updatedProduct = await productService.updateProduct(id, data);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  },
);

export const deleteProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    await productService.softDeleteProduct(id as string);

    res.sendStatus(204);
  },
);
