import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as userService from "../services/user.service";
import { ROLES } from "../constants/roles";

export const findAllUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;
    const search = req.query.search ?? "";

    const users = await userService.getAllUsers(
      search as string,
      Number(page),
      Number(limit),
    );

    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      data: users,
    });
  },
);

export const findUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const user = await userService.getUserById(id);

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  },
);

export const findUsersByRole = asyncHandler(
  async (req: Request, res: Response) => {
    const role = req.params.role as Partial<(typeof ROLES)[keyof typeof ROLES]>;

    const users = await userService.getUserByRole(role);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  },
);

export const UpdateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const user = await userService.updateUser(id, req.body);

  res.status(204).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const workerId = req.params.id as string;

  const deleteUser = await userService.deleteUser(userId as string, workerId);

  return res.sendStatus(204).json({
    success: true,
    message: "User deleted successfully",
  });
});
