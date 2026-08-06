import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";
import "express";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export {};

export default (req: Request, res: Response, next: NextFunction) => {
  req.requestId = uuid();

  res.setHeader("X-Request-ID", req.requestId);

  next();
};
