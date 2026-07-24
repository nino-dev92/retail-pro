import mongoose, { Document, Schema, model, Types } from "mongoose";

interface ISaleItem {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  subtotal: number;
}

interface ISale extends Document {
  items: ISaleItem[];
  total: number;
  profit: number;
  cashier: Types.ObjectId;
  paymentMethod: "CASH" | "TRANSFER" | "CARD";
  invoiceNum: string;
  status: "COMPLETED" | "REFUNDED";
}

const saleSchema: Schema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        costPrice: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    total: { type: Number, required: true },
    profit: { type: Number, required: true },
    cashier: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentMethod: { type: String, enum: ["CASH", "TRANSFER", "CARD"] },
    invoiceNum: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["COMPLETED", "REFUNDED"],
      default: "COMPLETED",
    },
  },
  { timestamps: true },
);

saleSchema.index({ createdAt: -1 });

saleSchema.index({ cashier: 1 });

export default model<ISale>("Sale", saleSchema);
