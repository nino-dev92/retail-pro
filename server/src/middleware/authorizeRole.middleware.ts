import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
// import { ROLES } from "../constants/roles";

// Role = typeof ROLES [keyof typeof ROLES]

const authorizeRole =
  (...allowedRoles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError("Unauthorized", 401);
    }

    if (!allowedRoles?.includes(req.user.role))
      throw new ApiError("Forbidden", 403);

    next();
  };

export default authorizeRole;
