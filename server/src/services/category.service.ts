import Category from "../models/Category";
import ApiError from "../utils/apiError";
import { ICategory } from "../models/Category";
import { Types } from "mongoose";

export const allCategories = async (search?: string) => {
  const filter: any = {
    isActive: true,
  };

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  const categories = await Category.find(filter);

  return categories;
};

export const addCategory = async (data: {
  name: string;
  description: string;
}) => {
  const { name, description } = data;

  const exists = await Category.findOne({
    name,
  });

  if (exists) throw new ApiError("Category already exists", 409);

  const category = await Category.create({
    name,
    description,
  });

  return category;
};

export const editCategory = async (id: string, data: Partial<ICategory>) => {
  const valid = Types.ObjectId.isValid(id);

  if (!valid) throw new ApiError("Invalid category", 404);

  const update = await Category.findByIdAndUpdate(id, data, { new: true });

  if (!update) throw new ApiError("Category not found", 404);

  return update;
};

export const removeCategory = async (id: string, change: boolean) => {
  const valid = Types.ObjectId.isValid(id);

  if (!valid) throw new ApiError("Invalid category", 409);

  const update = await Category.findByIdAndUpdate(
    id,
    { isActive: change },
    { new: true },
  );

  if (!update) throw new ApiError("Category not found", 404);

  return update;
};
