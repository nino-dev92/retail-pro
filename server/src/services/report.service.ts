import Product from "../models/Product";
import Sale from "../models/Sale";
import Refund from "../models/Refund";
import PurchaseOrder from "../models/PurchaseOrder";
import { getAllSales } from "./sale.service";
import { showAllRefunds } from "./refund.service";
import { getAllStockMovements } from "./stockMovement.service";
import { findAllPurchaseOrders } from "./purchaseOrder.service";

export const getSalesReport = async (
  userId: string,
  page = 1,
  limit = 1,
  from: string,
  to: string,
  minTotal?: number,
  maxTotal?: number,
) => {
  const salesReport = await getAllSales(
    userId,
    page,
    limit,
    from,
    to,
    minTotal,
    maxTotal,
  );

  return salesReport;
};

export const getPurchaseReport = async (
  page = 1,
  limit = 1,
  from: string,
  to: string,
  supplier: string,
) => {
  const purchaseReport = await findAllPurchaseOrders(
    page,
    limit,
    from,
    to,
    supplier,
  );

  return purchaseReport;
};

export const getRefundReport = async (
  page = 1,
  limit = 1,
  from: string,
  to: string,
) => {
  const refundReports = await showAllRefunds(page, limit, from, to);

  return refundReports;
};

export const getStockMovementReport = async (
  page = 1,
  limit = 1,
  from: string,
  to: string,
) => {
  const stockMovements = await getAllStockMovements(page, limit, from, to);

  return stockMovements;
};

export const getInventoryReport = async () => {
  const products = await Product.find(
    { isActive: true },
    {
      name: 1,
      sku: 1,
      quantity: 1,
      price: 1,
    },
  );

  return products.map((product) => ({
    ...product.toObject(),
    inventoryValue: product.price * product.quantity,
  }));
  //  return await Product.aggregate([
  //     {
  //       $match: {
  //         isActive: true,
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 0,
  //         name: 1,
  //         sku: 1,
  //         quantity: 1,
  //         price: 1,
  //         inventoryValue: {
  //           $multiply: ["$price", "$quantity"],
  //         },
  //       },
  //     },
  //     {
  //       $sort: {
  //         name: 1,
  //       },
  //     },
  //   ]);
};

export const getSummaryReport = async () => {
  const [totalSales, totalRevenue, totalRefunds, totalPurchases, inventory] =
    await Promise.all([
      Sale.countDocuments(),

      Sale.aggregate([
        {
          $group: {
            _id: null,
            revenue: {
              $sum: "$total",
            },
          },
        },
      ]),

      Refund.countDocuments(),

      PurchaseOrder.countDocuments(),

      Product.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $group: {
            _id: null,
            inventoryValue: {
              $sum: {
                $multiply: ["$price", "$quantity"],
              },
            },
          },
        },
      ]),
    ]);

  return {
    totalSales,
    totalRevenue: totalRevenue[0]?.revenue ?? 0,
    totalRefunds,
    totalPurchases,
    inventoryValue: inventory[0]?.inventoryValue ?? 0,
  };
};
