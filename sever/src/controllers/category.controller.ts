import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as categoryService from "../services/category.service";
import { ICategory } from "../models/Category";

export const viewAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;

    const categories = await categoryService.allCategories(search);

    res.status(200).json({
      success: true,
      message: "All Categories",
      data: categories,
    });
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const data: ICategory = req.body;

    const category = await categoryService.addCategory(data);

    res.status(201).json({
      success: true,
      message: "Category created Successfully",
      data: category,
    });
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const data: Partial<ICategory> = req.body;

    const update = await categoryService.editCategory(id, data);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: update,
    });
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const change = req.body as string;

    await categoryService.removeCategory(id, change);

    res.sendStatus(204);
  },
);
