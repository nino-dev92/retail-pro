import Joi from "joi";

const userValidationSchema = Joi.object({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().trim().required().email().lowercase(),
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export default userValidationSchema;
