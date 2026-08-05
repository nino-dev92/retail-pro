import jwt from "jsonwebtoken";
import env from "../config/env";

export const generateAccessToken = async (data: JwtPayload) => {
  const { userId, role } = data;
  return await jwt.sign({ userId, role }, env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = async (data: JwtPayload) => {
  const { userId, role } = data;

  return await jwt.sign({ userId, role }, env.JWT_REFRESH_SECRET as string, {
    expiresIn: "5d",
  });
};
