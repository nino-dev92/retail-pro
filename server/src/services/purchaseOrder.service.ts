import mongoose from "mongoose";
import PurchaseOrder from "../models/PurchaseOrder";
import Supplier from "../models/Supplier";
import User from "../models/User";
import Product from "../models/Product";
import { addStockMovement } from "./stockMovement.service";
import ApiError from "../utils/apiError";
import { ROLES } from "../constants/roles";

type PurchaseOrderItemDTO = {
  productId: string;
  price: number;
  quantity: number;
};

type PurchaseOrderDTO = {
  items: PurchaseOrderItemDTO[];
  supplier: string;
};

type StockMovementDTO = {
  productId: string;
  actorId: string;
  quantity: number;
  action: "ADD" | "REMOVE" | "SALE" | "REFUND";
  reason: string;
};

export const createPurchaseOrder = async (
  userId: string,
  data: PurchaseOrderDTO,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { supplier, items } = data;

    if (!items.length)
      throw new ApiError("Purchase order must contain at least one item", 400);

    // Verify user
    const user = await User.findById(userId).session(session);

    if (!user) throw new ApiError("User not found", 404);

    if (user.role !== ROLES.ADMIN && user.role !== ROLES.MANAGER) {
      throw new ApiError("Forbidden", 403);
    }

    // Verify supplier
    const existingSupplier = await Supplier.findById(supplier).session(session);

    if (!existingSupplier) throw new ApiError("Supplier not found", 404);

    const purchaseItems = [];
    const stockMovements = [];

    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) throw new ApiError("Product not found", 404);

      const subtotal = item.price * item.quantity;

      total += subtotal;

      purchaseItems.push({
        product: product._id,
        quantity: item.quantity,
        price: item.price,
        subtotal,
      });

      const movementData: StockMovementDTO = {
        productId: item.productId,
        actorId: userId,
        quantity: item.quantity,
        action: "ADD",
        reason: "PURCHASE ORDER",
      };

      const movement = await addStockMovement(movementData, session);

      stockMovements.push(movement);
    }

    const purchaseOrder = await PurchaseOrder.create(
      [
        {
          supplier,
          items: purchaseItems,
          total,
          createdBy: user._id,
          purchaseOrderNumber: `PO-${new Date().getFullYear()}-${Date.now()}`,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return {
      purchaseOrder: purchaseOrder[0],
      stockMovements,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const findAllPurchaseOrders = async (
  page = 1,
  limit = 10,
  from: string,
  to: string,
  supplier: string,
) => {
  const filter: any = {};
  const skip = (page - 1) * limit;

  const purchaseOrders = await PurchaseOrder.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return purchaseOrders;
};

export const findPurchaseOrderById = async (id: string) => {
  const purchaseOrder = await PurchaseOrder.findById(id);

  if (!purchaseOrder) throw new ApiError("Purchase order not found", 404);

  return purchaseOrder;
};
