import mongoose, { Document, Schema, model, Types } from "mongoose";

interface IPurchaseOrderItem extends Document {
  product: Types.ObjectId;
  price: number;
  quantity: number;
  subTotal: number;
}
interface IPurchaseOrder extends Document {
  items: IPurchaseOrderItem[];
  total: number;
  supplier: Types.ObjectId;
  purchaseOrderNumber: string;
  createdBy: Types.ObjectId;
}

const purchaseOrderSchema: Schema = new mongoose.Schema(
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
        },
        price: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    purchaseOrderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IPurchaseOrder>("PurchaseOrder", purchaseOrderSchema);
