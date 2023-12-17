import express from "express";
// import customerSchema from "../../schemas/customer-schemas.js";
// import { validateBody } from "../../decorators/index.js";
import { authenticate, isValidCustomerId } from "../../middlewares/index.js";
import customerController from "../../controllers/customer-controller.js";

const customerRouter = express.Router();

// const customersAddValidate = validateBody(customerSchema.customerAddSchema);

customerRouter.use(authenticate);

customerRouter.get("/", customerController.getAll);
customerRouter.get(
  "/:customerId",
  isValidCustomerId,
  customerController.getById
);

export default customerRouter;
