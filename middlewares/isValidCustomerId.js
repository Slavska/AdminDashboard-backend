import { isValidObjectId } from "mongoose";
import { HttpCode } from "../constants/user-constants.js";
import { HttpError } from "../helpers/index.js";

const isValidCustomerId = (req, res, next) => {
  const { customerId } = req.params;
  if (!isValidObjectId(customerId)) {
    return next(HttpError(HttpCode.NOT_FOUND, `${customerId} is not valid id`));
  }
  next();
};

export default isValidCustomerId;
