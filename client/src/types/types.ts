export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
// Dashboard Stats

export interface DashboardStats {
  stats: {
    date: string;
    itemsSold: number;
    lowStock: number;
    outOfStock: number;
    revenue: number;
    totalCategories: number;
    totalProducts: number;
    totalTransactions: number;
    recentSales: RecentSale[];
  };

  charts: {
    revenueByMonth: RevenueByMonth[];
    salesByDay: SalesByDay[];
  };

  inventory: {
    inventoryValue: InventoryValue[];
  };

  products: {
    revenueByCategory: RevenueByCategory[];
    topSellingProducts: TopSellingProduct[];
  };
}

export interface RevenueByMonth {
  revenue: number;
  month: string;
}

export interface SalesByDay {
  revenue: number;
  transactions: number;
  date: string;
}

export interface InventoryValue {
  totalInventory: number;
}

export interface RevenueByCategory {
  category: string;
  revenue: number;
}

export interface TopSellingProduct {
  totalSold: number;
  name: string;
  sku: string;
}

export interface RecentSale {
  _id: string;
  items: SaleItem[];
  total: number;
  profit: number;
  cashier: Cashier;
  createdAt: string;
  updatedAt: string;
  invoiceNum: string;
  paymentMethod: string;
  status: string;
}

export interface SaleItem {
  _id: string;
  costPrice: number;
  product: string;
  quantity: number;
  subtotal: number;
  unitPrice: number;
}

export interface Cashier {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface RefundItem {
  productId: string;
  quantity: number;
  price: number;
  subTotal: number;
}

export interface Refund {
  sale: string;
  items: RefundItem[];
  total: number;
  createdBy: string;
  reason: string;
}
