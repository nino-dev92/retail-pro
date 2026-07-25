import joi from "joi";

const refundValidatorSchema = joi.object({
  items: joi.array().items({
    productId: joi.string().required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
  }),
  total: joi.number().required(),
  reason: joi.string().required(),
});

export default refundValidatorSchema;
