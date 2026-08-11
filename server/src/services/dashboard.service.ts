import Product from "../models/Product";
import Sale from "../models/Sale";
import Category from "../models/Category";

// Helper: safely convert MongoDB values to numbers
const toNumber = (field: string) => ({
  $convert: {
    input: field,
    to: "double",
    onError: 0,
    onNull: 0,
  },
});

// DASHBOARD SUMMARY CARDS

export const getDashboardStats = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [
    todaySales,
    lowStock,
    outOfStock,
    recentSales,
    totalProducts,
    totalCategories,
    totalTransactions,
  ] = await Promise.all([
    Sale.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),

    Product.countDocuments({
      quantity: { $lte: 5 },
      isActive: true,
    }),

    Product.countDocuments({
      quantity: 0,
      isActive: true,
    }),

    Sale.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("cashier", "firstName lastName"),

    Product.countDocuments({
      isActive: true,
    }),

    Category.countDocuments({
      isActive: true,
    }),

    Sale.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
  ]);

  // Calculate today's revenue safely
  let revenue = 0;

  todaySales.forEach((sale) => {
    const saleTotal = Number(sale.total) || 0;
    revenue += saleTotal;
  });

  // Calculate today's items sold safely
  let itemsSold = 0;

  todaySales.forEach((sale) => {
    if (!Array.isArray(sale.items)) return;

    sale.items.forEach((item) => {
      itemsSold += Number(item.quantity) || 0;
    });
  });

  return {
    date: new Date(),
    revenue,
    totalTransactions,
    itemsSold,
    lowStock,
    outOfStock,
    totalProducts,
    totalCategories,
    recentSales,
  };
};

// CHARTS

export const getSalesByDay = async (days = 7) => {
  const startDate = new Date();

  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  return await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
        },
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },

        revenue: {
          $sum: toNumber("$total"),
        },

        transactions: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },

    {
      $project: {
        _id: 0,
        date: "$_id",
        revenue: 1,
        transactions: 1,
      },
    },
  ]);
};

// REVENUE BY MONTH

export const getRevenueByMonth = async () => {
  const startDate = new Date();

  startDate.setMonth(startDate.getMonth() - 11);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  return await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
        },
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m",
            date: "$createdAt",
          },
        },

        revenue: {
          $sum: toNumber("$total"),
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },

    {
      $project: {
        _id: 0,
        month: "$_id",
        revenue: 1,
      },
    },
  ]);
};

// PRODUCT ANALYTICS

// TOP SELLING PRODUCTS
export const getTopSellingProducts = async () => {
  return await Sale.aggregate([
    {
      $unwind: "$items",
    },

    {
      $group: {
        _id: "$items.product",

        totalSold: {
          $sum: toNumber("$items.quantity"),
        },
      },
    },

    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },

    {
      $unwind: "$product",
    },

    {
      $sort: {
        totalSold: -1,
      },
    },

    {
      $limit: 5,
    },

    {
      $project: {
        _id: 0,
        name: "$product.name",
        sku: "$product.sku",
        totalSold: 1,
      },
    },
  ]);
};

// REVENUE BY CATEGORY
export const getRevenueByCategory = async () => {
  return await Sale.aggregate([
    {
      $unwind: "$items",
    },

    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "product",
      },
    },

    {
      $unwind: "$product",
    },

    {
      $lookup: {
        from: "categories",
        localField: "product.category",
        foreignField: "_id",
        as: "category",
      },
    },

    {
      $unwind: "$category",
    },

    {
      $group: {
        _id: "$category.name",

        revenue: {
          $sum: toNumber("$items.subtotal"),
        },
      },
    },

    {
      $sort: {
        revenue: -1,
      },
    },

    {
      $project: {
        _id: 0,
        category: "$_id",
        revenue: 1,
      },
    },
  ]);
};

// INVENTORY ANALYTICS

export const getInventoryValue = async () => {
  return await Product.aggregate([
    {
      $match: {
        isActive: true,
      },
    },

    {
      $group: {
        _id: null,

        totalInventory: {
          $sum: {
            $multiply: [toNumber("$price"), toNumber("$quantity")],
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        totalInventory: 1,
      },
    },
  ]);
};

// MAIN DASHBOARD

export const getDashboard = async () => {
  const [
    stats,
    salesByDay,
    revenueByMonth,
    topSellingProducts,
    revenueByCategory,
    inventoryValue,
  ] = await Promise.all([
    getDashboardStats(),
    getSalesByDay(),
    getRevenueByMonth(),
    getTopSellingProducts(),
    getRevenueByCategory(),
    getInventoryValue(),
  ]);

  return {
    stats,

    charts: {
      salesByDay,
      revenueByMonth,
    },

    products: {
      topSellingProducts,
      revenueByCategory,
    },

    inventory: {
      inventoryValue,
    },
  };
};
