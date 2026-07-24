import joi from "joi";

const categoryValidationSchema = joi.object({
  name: joi.string().trim().min(2).max(100).required(),

  description: joi.string().trim().max(500).required(),
});

export default categoryValidationSchema;
