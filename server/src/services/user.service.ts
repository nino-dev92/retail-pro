import User from "../models/User";
import { ROLES } from "../constants/roles";
import ApiError from "../utils/apiError";
import { Types } from "mongoose";

export const getAllUsers = async (search?: string, page = 1, limit = 10) => {
  const filter: any = {};
  const skip = (page - 1) * 10;

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  const allUsers = await User.find(filter)
    .skip(skip)
    .sort({ createdAt: 1 })
    .limit(limit);

  return allUsers;
};

export const getUserById = async (id: string, page = 1, limit = 10) => {
  const skip = (page - 1) * 10;

  if (!Types.ObjectId.isValid(id)) throw new ApiError("Invalid userId", 422);

  const user = await User.findById(id).limit(limit).skip(skip);

  if (!user) throw new ApiError("User not found", 404);

  return user;
};

export const getUserByRole = async (
  role: Partial<(typeof ROLES)[keyof typeof ROLES]>,
) => {
  const users = await User.find({ role });

  if (!users) throw new ApiError("USers not found", 404);

  return users;
};

export const updateUser = async (id: string, update: any) => {
  if (!Types.ObjectId.isValid(id)) throw new ApiError("Invalid User", 422);

  const updateUser = await User.findByIdAndUpdate(id, update, { new: true });

  return updateUser;
};
