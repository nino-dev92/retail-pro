import { Request, Response, NextFunction } from "express";
import joi from "joi";
import logger from "../logger/logger";

const validate = (schema: joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
};

export default validate;
