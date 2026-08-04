import mongoose, { Document, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  isActive: boolean;
  sku: string;
  category: Types.ObjectId;
  createdBy: Types.ObjectId;
  readonly instock: boolean;
}

export const mapProductDTO = (product: IProduct) => ({
  id: product._id,
  name: product.name,
  description: product.description,
  price: product.price,
  sku: product.sku,
  isActive: product.isActive,
});
