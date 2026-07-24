import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Users from "../models/User";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError";
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

const verifyJWT = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new ApiError("Token not found", 401);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await Users.findById(decoded.userId);

    if (!user) {
      throw new ApiError("Unauthorized", 401);
    }

    req.user = {
      userId: user._id.toString(),
      role: user.role,
    };

    next();
  },
);

export default verifyJWT;
