import Sale from "../models/Sale";
import { ROLES } from "../constants/roles";
import User from "../models/User";
import { createStockMovement } from "./stockMovement.service";
import ApiError from "../utils/apiError";
import mongoose from "mongoose";

interface SaleItemDTO {
  productId: string;
  quantity: number;
}

interface CreateSaleDTO {
  items: SaleItemDTO[];
  paymentMethod: "CASH" | "TRANSFER" | "CARD";
}

interface StockMovementDTO {
  productId: string;
  actorId: string;
  quantity: number;
  action: "ADD" | "REMOVE" | "SALE";
  reason: string;
}

export const createSale = async (data: CreateSaleDTO, userId: string) => {
  // Start session and transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  const { items } = data;

  let total = 0;

  let totalProfit = 0;

  const saleItems = [];

  const movements = [];
  try {
    const user = await User.findById(userId).session(session);

    if (!user) throw new ApiError("User not found", 404);

    if (user.role != ROLES.CASHIER) throw new ApiError("Forbidden", 403);

    for (const item of items) {
      const ids = items.map((item) => item.productId);

      const uniqueIds = new Set(ids);

      if (ids.length !== uniqueIds.size) {
        throw new ApiError(
          "Duplicate products are not allowed in one sale.",
          422,
        );
      }

      const stockMovementDTO: StockMovementDTO = {
        productId: item.productId,
        actorId: userId,
        quantity: item.quantity,
        action: "SALE",
        reason: "SALE",
      };

      const stockMovement = await createStockMovement(
        stockMovementDTO,
        session,
      );

      const subtotal = stockMovement.product.price * item.quantity;

      total += subtotal;

      const profit =
        (stockMovement.product.price - stockMovement.product.costPrice) *
        item.quantity;

      totalProfit += profit;

      saleItems.push({
        product: stockMovement.product._id,
        quantity: item.quantity,
        unitPrice: stockMovement.product.price,
        unitCost: stockMovement.product.costPrice,
        subtotal,
      });

      movements.push(stockMovement);
    }

    const sale = await Sale.create(
      [
        {
          items: saleItems,
          total,
          cashier: user._id,
          invoiceNum: `INV-${Date.now()}`,
          paymentMethod: data.paymentMethod,
        },
      ],
      {
        session,
      },
    );

    // Commit session
    await session.commitTransaction();

    return { sale: sale[0], stockMovement: movements };
  } catch (error: any) {
    await session.abortTransaction();
    throw error;
  } finally {
    // End session
    session.endSession();
  }
};

export const getAllSales = async (
  userId: string,
  page = 1,
  limit = 10,
  from?: string,
  to?: string,
  minTotal?: number,
  maxTotal?: number,
  productId?: string,
) => {
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (from || to) {
    filter.createdAt = {};

    if (from) filter.createdAt.$gte = new Date(from);

    if (to) filter.createdAt.$lte = new Date(to);
  }

  if (productId) {
    filter["items.product"] = productId;
  }

  if (minTotal || maxTotal) {
    filter.total = {};

    if (minTotal) {
      filter.total.$gte = minTotal;
    }

    if (maxTotal) {
      filter.total.$lte = maxTotal;
    }
  }

  let sales;
  if (userId) {
    sales = await Sale.find({ cashier: userId })
      .limit(limit)
      .skip(skip || 0)
      .sort({ createdAt: -1 })
      .populate("cashier", "firstName lastName")
      .populate("items.product", "name sku price");
  } else {
    sales = await Sale.find(filter)
      .limit(limit)
      .skip(skip || 0)
      .sort({ createdAt: -1 })
      .populate("cashier", "firstName lastName")
      .populate("items.product", "name sku price");
  }

  const total = await Sale.countDocuments(filter);

  return { sales, total };
};

export const getSalesByCashier = async (userId: string) => {
  const filter: any = {};

  filter.cashier = userId;
  const sale = await Sale.find(filter)
    .populate("cashier", "firstName lastName")
    .populate("items.product", "name sku price");

  if (!sale) throw new ApiError("Not Found", 404);

  return sale;
};
