import joi from "joi";

const stockMovementValidationSchema = joi.object({
  product: joi.string().required(),
  action: joi.string().required(),
  quantity: joi.number().required().min(0),
});

export default stockMovementValidationSchema;
