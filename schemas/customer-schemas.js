import Joi from "joi";

export const customerAddSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  spent: Joi.string(),
});
export default {
  customerAddSchema,
};
