import { isValidObjectId } from "mongoose";
import { HttpCode } from "../constants/user-constants.js";
import { HttpError } from "../helpers/index.js";

const isValidProductId = (req, res, next) => {
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    return next(HttpError(HttpCode.NOT_FOUND, `${productId} is not valid id`));
  }
  next();
};

export default isValidProductId;
