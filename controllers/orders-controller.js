import { ctrlWrapper } from "../decorators/index.js";
import Order from "../models/orders.js";
import { HttpError } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  try {
    const orders = await Order.find({});

    if (!orders || orders.length === 0) {
      throw HttpError(404, `Order not found`);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(error);
  }
};
const getByName = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(HttpError(400, "Name parameter is required"));
  }

  try {
    const orders = await Order.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!orders || orders.length === 0) {
      throw HttpError(404, `No orders found for name ${name}`);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by name:", error);
    next(error);
  }
};

export default {
  getAll: ctrlWrapper(getAll),
  getByName: ctrlWrapper(getByName),
};
