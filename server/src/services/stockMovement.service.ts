import Product from "../models/Product";
import User from "../models/User";
import StockMovement from "../models/StockMovement";
import mongoose, { Types } from "mongoose";
import ApiError from "../utils/apiError";
import { ROLES } from "../constants/roles";

type StockMovementDTO = {
  productId: string;
  actorId: string;
  quantity: number;
  action: "ADD" | "REMOVE" | "SALE" | "REFUND";
  reason: string;
};

export const createStockMovement = async (
  data: StockMovementDTO,
  session: mongoose.ClientSession,
) => {
  const { productId, reason, actorId, quantity, action } = data;

  if (!Types.ObjectId.isValid(productId))
    throw new ApiError("Invalid product", 422);

  if (!Types.ObjectId.isValid(actorId)) throw new ApiError("Invalid user", 409);

  const product = await Product.findById(productId).session(session);

  if (!product) throw new ApiError("Product not found", 404);

  if (!product.isActive) throw new ApiError("Product not active", 400);

  if (quantity <= 0)
    throw new ApiError("Quantity must be greater than zero", 422);

  const user = await User.findById(actorId).session(session);

  if (!user) throw new ApiError("User not found", 404);

  const role = user.role;

  if ((action === "ADD" || action === "REMOVE") && role === ROLES.CASHIER)
    throw new ApiError("Forbidden", 403);

  if (action === "ADD") {
    product.quantity += quantity;
  }

  if (action === "REMOVE" || action === "SALE") {
    if (product.quantity < quantity)
      throw new ApiError("Insufficient stock", 422);
    product.quantity -= quantity;
  }

  await product.save({ session });

  const stockMovement = await StockMovement.create(
    [
      {
        product: productId,
        quantity,
        action: "SALE",
        actor: actorId,
        reason,
      },
    ],
    { session },
  );

  return {
    movement: stockMovement[0],
    product,
  };
};

export const getAllStockMovements = async () => {
  const filter: any = {};

  const stockMovements = await StockMovement.find(filter).sort({
    createdAt: -1,
  });

  return stockMovements;
};

export const getStockMovementById = async (id: string) => {
  const stockMovement = await StockMovement.findById(id);

  if (!stockMovement) throw new ApiError("Stock movement not found", 404);

  return stockMovement;
};

export const addStockMovement = async (
  data: StockMovementDTO,
  session: mongoose.ClientSession,
) => {
  const { productId, actorId, quantity } = data;

  const product = await Product.findById(productId).session(session);

  if (!product) throw new ApiError("Product not found", 404);

  product.quantity += quantity;

  await product.save({ session });

  const stockMovement = await StockMovement.create(
    [
      {
        product: productId,
        quantity,
        actor: actorId,
        action: "ADD",
        reason: "Restock",
      },
    ],
    { session },
  );

  return stockMovement;
};

export const refundStockMovement = async (
  data: any,
  session: mongoose.ClientSession,
) => {
  const product = await Product.findById(data.productId).session(session);

  if (!product) throw new ApiError("Product not found", 404);

  product.quantity += data.quantity;

  product.save({ session });

  return product;
};

export const inventoryAdjustmentMovement = async (
  data: any,
  session: mongoose.ClientSession,
) => {
  const { productId, quantity, adjustmentType } = data;

  const product = await Product.findById(productId).session(session);

  if (!product) throw new ApiError("Product not found", 404);

  if (adjustmentType === "INCREASE") {
    product.quantity += quantity;
  } else {
    product.quantity -= quantity;
  }

  await product.save({ session });

  return product;
};
