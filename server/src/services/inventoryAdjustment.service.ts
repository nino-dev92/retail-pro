import mongoose from "mongoose";
import InventoryAdjustment from "../models/inventoryAdjustment";
import User from "../models/User";
import Product from "../models/Product";
import ApiError from "../utils/apiError";
import { ROLES } from "../constants/roles";
import { inventoryAdjustmentMovement } from "./stockMovement.service";

type FeatureAdjustmentItem = {
  productId: string;
  quantity: number;
};
type FeatureAdjustmentDTO = {
  items: FeatureAdjustmentItem[];
  adjustmentType: string;
  reason: string;
};

type AdjustmentDTO = {
  productId: string;
  quantity: number;
  reason: string;
  adjustmentType: string;
};

export const addFeatureAdjustment = async (
  userId: string,
  data: FeatureAdjustmentDTO,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const items = [];

  const movements = [];

  try {
    const user = await User.findById(userId).session(session);

    if (!user) throw new ApiError("User not found", 404);

    if (user.role === ROLES.CASHIER) throw new ApiError("Forbidden", 403);

    for (const item of data.items) {
      const adjustmentDTO: AdjustmentDTO = {
        productId: item.productId,
        quantity: item.quantity,
        adjustmentType: data.adjustmentType,
        reason: data.reason,
      };

      // create stock movement

      const stockMovement = await inventoryAdjustmentMovement(
        adjustmentDTO,
        session,
      );

      movements.push(stockMovement);

      items.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    const adjustment = await InventoryAdjustment.create(
      [
        {
          items,
          reason: data.reason,
          adjustmentType: data.adjustmentType,
          createdBy: userId,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return { featureAdjustment: adjustment[0], movements };
  } catch (error: any) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const getAllAdjustments = async (
  page = 1,
  limit = 10,
  from?: string,
  to?: string,
) => {
  const filter: any = {};

  const skip = (page - 1) * limit;

  if (from || to) {
    filter.createdAt = {};

    if (from) {
      filter.createdAt.$gte = new Date(from);
    }
    if (to) {
      filter.createdAt.$lte = new Date(to);
    }
  }

  const adjustments = await InventoryAdjustment.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("createdBy", "firstName lastName")
    .populate("items.productId", "name sku");

  const total = await InventoryAdjustment.countDocuments(filter);

  return { adjustments, total };
};

export const getAdjustmentById = async (id: String) => {
  const adjustment = await InventoryAdjustment.findById(id)
    .populate("createdBy", "firstName lastName")
    .populate("items.productId", "name sku");

  if (!adjustment) throw new ApiError("Adjustment not found", 404);

  return adjustment;
};
