import Products from "../models/Product";
import { IProduct } from "../models/Product";
import ApiError from "../utils/apiError";
import { Types } from "mongoose";
import User from "../models/User";
import genetateSKU from "../utils/generateSKU";
import { mapProductDTO } from "../utils/mapProductDTO";
import Category from "../models/Category";

export const findAllProducts = async (
  page: number,
  limit: number,
  search?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
) => {
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    if (!Types.ObjectId.isValid(category))
      throw new ApiError("Invalid category", 422);

    filter.category = new Types.ObjectId(category);
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }

  const products = await Products.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  const totalProducts = await Products.countDocuments(filter);

  const productDTO = products.map((product) => {
    const { _id, name, description, price, sku } = product;

    return { _id, name, description, price, sku };
  });

  return { productDTO, totalProducts };
};

export const findProductById = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new ApiError("Invalid product details", 422);

  const product = await Products.findById(id);

  if (!product) throw new ApiError("Product not found", 404);

  return mapProductDTO(product);
};

export const addProduct = async (data: IProduct) => {
  const {
    name,
    description,
    price,
    costPrice,
    quantity,
    supplier,
    createdBy,
    category,
  } = data;

  if (!createdBy || !category) throw new Error("Incomplete product details");

  if (!Types.ObjectId.isValid(category) || !Types.ObjectId.isValid(createdBy))
    throw new ApiError("Invalid product details", 422);

  const checkUser = await User.findById(createdBy);

  if (!checkUser) throw new ApiError("User not found", 404);

  const checkCategory = await Category.findById(category);

  if (!checkCategory) throw new ApiError("Category not found", 404);

  const sku = genetateSKU(name);

  const product = await Products.create({
    name,
    description,
    price,
    costPrice,
    quantity,
    sku,
    supplier,
    createdBy,
    category,
  });

  return mapProductDTO(product);
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  if (!Types.ObjectId.isValid(id))
    throw new ApiError("Invalid product details", 422);

  const product = await Products.findByIdAndUpdate(id, data, { new: true });

  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  return mapProductDTO(product);
};

export const softDeleteProduct = async (id: string, update: boolean) => {
  await Products.findByIdAndUpdate(id, { isActive: update });
  return;
};
