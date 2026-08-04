import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";

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

  if (err instanceof Joi.ValidationError) {
    return res.status(422).json({
      success: false,
      message: err.details[0].message,
    });
  }

  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
};

export default errorMiddleware;
