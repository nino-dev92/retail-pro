import mongoose, { Document, Schema, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  isActive: boolean;
}

const categorySchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default model<ICategory>("Category", categorySchema);
