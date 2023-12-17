import { ctrlWrapper } from "../decorators/index.js";
import Dashboard from "../models/dashboard.js";
import Customer from "../models/customer.js";
import { HttpError, handleGetDashboardsData } from "../helpers/index.js";
import Product from "../models/product.js";
import Supplier from "../models/supplier.js";

export const getDashboardData = async (req, res) => {
  try {
    const dashboards = await Dashboard.find({});
    const products = (await Product.find({})).length;
    const customers = await Customer.find({});
    const suppliers = (await Supplier.find({})).length;

    if (!dashboards || dashboards.length === 0) {
      throw HttpError(404, `Dashboard not found`);
    }

    res.status(200).json({ dashboards, customers, suppliers, products });
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(error);
  }
};

export default {
  getDashboardsData: ctrlWrapper(getDashboardData),
};
