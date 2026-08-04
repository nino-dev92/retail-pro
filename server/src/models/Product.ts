import mongoose, { Document, model, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  costPrice: number;
  quantity: number;
  supplier: Types.ObjectId;
  isActive: boolean;
  sku: string;
  category: Types.ObjectId;
  createdBy: Types.ObjectId;
  readonly instock: boolean;
}

const productSchema: Schema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    price: { type: Number, required: true, min: 1 },
    costPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, default: 0, min: 0 },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    isActive: { type: Boolean, required: true, default: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// productSchema.set("toJSON", { virtuals: true });
// productSchema.set("toObject", { virtuals: true });

productSchema.index({ category: 1 });

productSchema.virtual("inStock").get(function (this: IProduct) {
  return this.quantity > 0;
});

export default model<IProduct>("Product", productSchema);
