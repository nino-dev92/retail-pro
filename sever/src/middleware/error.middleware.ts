import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
};

export default errorMiddleware;
