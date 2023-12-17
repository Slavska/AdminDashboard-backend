import express from "express";
import dashboardController from "../../controllers/dashboard-controller.js";

import { authenticate } from "../../middlewares/index.js";

const dashboardRouter = express.Router();

dashboardRouter.use(authenticate);

dashboardRouter.get("/", dashboardController.getDashboardsData);

export default dashboardRouter;
