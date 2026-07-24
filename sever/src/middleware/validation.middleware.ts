import { Request, Response, NextFunction } from "express";
import joi from "joi";

const validate = (schema: joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate;
