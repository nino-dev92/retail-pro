import mongoose, { Schema, model, Document } from "mongoose";
import { ROLES } from "../constants/roles";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ debug: true });

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "cashier";
  isVerified: boolean;
  refreshToken: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.CASHIER },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: null, select: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS as string);

  if (!salt) throw new Error("BCRYPT_SALT_ROUNDS is missing");

  if (!this.isModified("password")) return;

  try {
    this.password = await bcrypt.hash(this.password as string, salt!);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export default model<IUser>("User", userSchema);
