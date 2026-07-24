import Joi from "joi";

const saleValidationSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
  paymentMethod: Joi.string().required(),
});

export default saleValidationSchema;
