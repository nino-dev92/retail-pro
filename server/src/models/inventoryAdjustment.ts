import mongoose, { Document, Schema, model, Types } from "mongoose";

interface IInventoryAdjustmentItem extends Document {
  productId: Types.ObjectId;
  quantity: number;
}

interface IFeatureAdjustment extends Document {
  items: IInventoryAdjustmentItem[];
  adjustmentType: string;
  reason: string;
  createdBy: Types.ObjectId;
}

const inventoryAdjustmentSchema: Schema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 0 },
      },
    ],
    adjustmentType: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default model<IFeatureAdjustment>(
  "InventoryAdjustment",
  inventoryAdjustmentSchema,
);
