import mongoose, { Document, model, Schema, Types } from "mongoose";

export interface IStockMovement extends Document {
  product: Types.ObjectId;
  action: "ADD" | "REMOVE" | "SALE";
  quantity: number;
  reason: string;
  actor: Types.ObjectId;
}

const stockMovementSchema: Schema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    action: { type: String, enum: ["ADD", "REMOVE", "SALE"] },
    quantity: { type: Number, required: true, min: 1 },
    reason: { type: String, required: true },
    actor: { type: String, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

stockMovementSchema.index({ createdAt: -1 });

stockMovementSchema.index({ product: 1 });

stockMovementSchema.index({ actor: 1 });

export default model<IStockMovement>("StockMovement", stockMovementSchema);
