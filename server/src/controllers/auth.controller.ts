import { Request, Response } from "express";
import {
  registerUser,
  signIn,
  refreshTokenService,
} from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import logger from "../logger/logger";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const newUserData = await registerUser(req.body);

  logger.info(`User ${newUserData.user.email} signed up`);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: newUserData,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const userData = await signIn(req.body);

  logger.info(
    `User ${userData.user.firstName} ${userData.user.lastName} logged in`,
  );

  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Login Successful",
    data: {
      id: userData.user.id,
      firstName: userData.user.firstName,
      lastName: userData.user.lastName,
      role: userData.user.role,
      accessToken: userData.accessToken,
    },
  });
});

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) throw new ApiError("Token not found", 401);

  const accessToken = await refreshTokenService(token);

  res.status(200).json({ success: true, accessToken });
});
