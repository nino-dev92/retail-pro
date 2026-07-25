import mongoose, { Document, Schema, model, Types } from "mongoose";

interface IRefundItems extends Document {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  subTotal: number;
}

interface IRefund extends Document {
  sale: Types.ObjectId;
  items: IRefundItems[];
  total: number;
  createdBy: Types.ObjectId;
  reason: string;
}

const refundSchema: Schema = new mongoose.Schema(
  {
    sale: {
      type: Schema.Types.ObjectId,
      ref: "Sale",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 1 },
        subTotal: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<IRefund>("Refund", refundSchema);
