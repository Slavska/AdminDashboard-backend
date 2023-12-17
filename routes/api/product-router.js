import express from "express";
import productSchema from "../../schemas/product-schemas.js";
import { validateBody } from "../../decorators/index.js";
import {
  isEmptyBody,
  authenticate,
  isValidProductId,
} from "../../middlewares/index.js";
import productController from "../../controllers/product-controller.js";

const productRouter = express.Router();

const productAddValidate = validateBody(productSchema.productAddSchema);

productRouter.use(authenticate);

productRouter.post("/", isEmptyBody, productAddValidate, productController.add);
productRouter.get("/", productController.getAll);
productRouter.get("/byName", productController.getByName);
productRouter.get("/:productId", isValidProductId, productController.getById);
productRouter.put(
  "/:productId",
  isEmptyBody,
  isValidProductId,
  productAddValidate,
  productController.updateById
);
productRouter.delete(
  "/:productId",
  isValidProductId,
  productController.deleteById
);

export default productRouter;
