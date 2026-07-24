import joi from "joi";

const productValidationSchema = joi.object({
  name: joi.string().required().min(2),
  description: joi.string().required(),
  price: joi.number().required(),
  costPrice: joi.number().required().min(0),
  quantity: joi.number(),
  supplier: joi.string().required().min(3),
  isActive: joi.boolean(),
  createdBy: joi.string().required(),
  category: joi.string().required(),
});

export default productValidationSchema;
