import joi from "joi";

const inventoryAdjustmentValidationSchema = joi.object({
  items: joi.array().items({
    productId: joi.string().required(),
    quantity: joi.number().required().min(1),
  }),
  reason: joi.string().required().valid("ADD", "REMOVE", "DAMAGED"),
  adjustmentTtpe: joi.string().required().valid("INCREASE", "DECREASE"),
});

export default inventoryAdjustmentValidationSchema;
