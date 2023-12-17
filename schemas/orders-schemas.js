import Joi from "joi";

export const orderAddSchema = Joi.object({
  photo: Joi.string(),
  name: Joi.string(),
  adress: Joi.string(),
  products: Joi.string(),
  price: Joi.string(),
  status: Joi.string(),
});
export default {
  orderAddSchema,
};
