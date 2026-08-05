import joi from "joi";

const purchaseOrderValidationSchema = joi.object({
  items: joi.array().items(
    joi.object({
      product: joi.string().required(),
      price: joi.number().required(),
      quantity: joi.number().required(),
    }),
  ),
  supplier: joi.string().required(),
});

export default purchaseOrderValidationSchema;
