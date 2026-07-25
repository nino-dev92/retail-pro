import Refund from "../models/Refund";
import User from "../models/User";
import { refundStockMovement } from "./stockMovement.service";
import mongoose from "mongoose";
import ApiError from "../utils/apiError";
import { ROLES } from "../constants/roles";
import Sale from "../models/Sale";

type ItemDTO = {
  productId: string;
  quantity: number;
};

type RefundDTO = {
  items: ItemDTO[];
  saleId: string;
  createdBy: string;
  reason: string;
};

export const refundSale = async (userId: string, data: RefundDTO) => {
  const session = await mongoose.startSession();
  await session.startTransaction();

  let total: number = 0;
  const movements = [];
  const items = [];

  try {
    const user = await User.findById(userId).session(session);

    if (!user) throw new ApiError("User not found", 404);

    if (user.role === ROLES.CASHIER) throw new ApiError("Forbidden", 403);

    const sale = await Sale.findById(data.saleId).session(session);

    if (!sale) throw new ApiError("Sale not found", 404);

    for (const item of data.items) {
      type StockMovementDTO = {
        productId: string;
        quantity: number;
      };
      const saleItem = sale.items.find(
        (saleItem) => saleItem.product.toString() === item.productId,
      );

      if (!saleItem)
        throw new ApiError("Product is not part of this sale", 404);

      // Check previous refund

      const previousRefunds = await Refund.find({
        sale: sale._id,
      }).session(session);

      // Calculate how many of this product have already been refunded
      let alreadyRefunded = 0;

      previousRefunds.forEach((refund) => {
        refund.items.forEach((refundItem) => {
          if (refundItem.productId.toString() === item.productId) {
            alreadyRefunded += refundItem.quantity;
          }
        });
      });

      const remainingRefundable = saleItem.quantity - alreadyRefunded;

      if (item.quantity > remainingRefundable) {
        throw new ApiError("Refund quantity exceeds quantity sold", 422);
      }

      const stockMovementData: StockMovementDTO = {
        productId: item.productId,
        quantity: item.quantity,
      };

      const stockMovement = await refundStockMovement(
        stockMovementData,
        session,
      );

      const subtotal = saleItem.unitPrice * item.quantity;

      total += subtotal;

      movements.push(stockMovement);

      items.push({
        productId: item.productId,
        price: saleItem.unitPrice,
        quantity: item.quantity,
        subtotal,
      });
    }

    const refund = await Refund.create(
      [
        {
          items,
          sale: sale._id,
          total,
          createdBy: userId,
          reason: data.reason,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return { refund: refund[0], movements };
  } catch (error: any) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const showAllRefunds = async (
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
      filter.createdAt.$gte = new Date(to);
    }
  }

  const allrefunds = await Refund.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return allrefunds;
};
