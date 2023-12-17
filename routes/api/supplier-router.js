import express from "express";
import supplierSchema from "../../schemas/suppliers-schemas.js";
import { validateBody } from "../../decorators/index.js";
import {
  isEmptyBody,
  authenticate,
  isValidSupplierId,
} from "../../middlewares/index.js";
import supplierController from "../../controllers/supplier-controller.js";

const supplierRouter = express.Router();

const supplierAddValidate = validateBody(supplierSchema.supplierAddSchema);

supplierRouter.use(authenticate);

supplierRouter.post(
  "/",
  isEmptyBody,
  supplierAddValidate,
  supplierController.add
);
supplierRouter.get("/", supplierController.getAll);
supplierRouter.get(
  "/:supplierId",
  isValidSupplierId,
  supplierController.getById
);
supplierRouter.put(
  "/:supplierId",
  isEmptyBody,
  isValidSupplierId,
  supplierAddValidate,
  supplierController.updateById
);
supplierRouter.delete(
  "/:supplierId",
  isValidSupplierId,
  supplierController.deleteById
);

export default supplierRouter;
