import { isValidObjectId } from "mongoose";
import { HttpCode } from "../constants/user-constants.js";
import { HttpError } from "../helpers/index.js";

const isValidSupplierId = (req, res, next) => {
  const { supplierId } = req.params;
  if (!isValidObjectId(supplierId)) {
    return next(HttpError(HttpCode.NOT_FOUND, `${supplierId} is not valid id`));
  }
  next();
};

export default isValidSupplierId;
