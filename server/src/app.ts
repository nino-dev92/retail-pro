import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ debug: true });

import errorMiddleware from "./middleware/error.middleware";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import saleRoutes from "./routes/sale.route";
import stockMovementRoutes from "./routes/stockMovement.route";
import dashboardRoutes from "./routes/dashboard.routes";
import supplierRoutes from "./routes/supplier.routes";
import purchaseOrderRoutes from "./routes/purchaseOrder.route";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/stock-movement", stockMovementRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/purchase-order", purchaseOrderRoutes);

app.use(errorMiddleware);

export default app;
