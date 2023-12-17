import express from "express";
import orderSchema from "../../schemas/orders-schemas.js";
import { validateBody } from "../../decorators/index.js";
import ordersController from "../../controllers/orders-controller.js";
import { authenticate } from "../../middlewares/index.js";

const ordersRouter = express.Router();

const orderAddValidate = validateBody(orderSchema.orderAddSchema);

ordersRouter.use(authenticate);

ordersRouter.get("/", authenticate, ordersController.getAll);

export default ordersRouter;
