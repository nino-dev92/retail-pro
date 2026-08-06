import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import dotenv from "dotenv";
dotenv.config({ debug: true });

import errorMiddleware from "./middleware/error.middleware";
import { apiLimiter } from "./middleware/rateLimiter";
import requestId from "./middleware/requestId";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import saleRoutes from "./routes/sale.route";
import stockMovementRoutes from "./routes/stockMovement.route";
import dashboardRoutes from "./routes/dashboard.routes";
import supplierRoutes from "./routes/supplier.routes";
import purchaseOrderRoutes from "./routes/purchaseOrder.route";
import refundRoutes from "./routes/refund.route";
import inventoryAdjustmentRoutes from "./routes/inventoryAdjustment.route";
import reportRoutes from "./routes/report.route";

const app = express();

app.use(helmet());
app.use(cors());
app.use(apiLimiter);
app.use(requestId);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/stock-movement", stockMovementRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/purchase-order", purchaseOrderRoutes);
app.use("/api/refund", refundRoutes);
app.use("/api/inventory-adjustments", inventoryAdjustmentRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorMiddleware);

export default app;
