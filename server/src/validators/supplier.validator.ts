import joi from "joi";

const supplierValidatorSchema = joi.object({
  name: joi.string().required().min(3),
  contactPerson: joi.string().required(),
  phone: joi.string().required(),
  email: joi.string().email().required(),
  address: joi.string().required(),
});

export default supplierValidatorSchema;
