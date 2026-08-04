import mongoose, { Document, Schema, model, mongo } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  active: boolean;
}

const supplierSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    contactPerson: { type: String, required: true, min: 3 },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default model<ISupplier>("Supplier", supplierSchema);
