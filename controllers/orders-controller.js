import { ctrlWrapper } from "../decorators/index.js";
import Order from "../models/orders.js";
import { HttpError } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  try {
    const { page = 1, name } = req.query;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    const totalOrders = await Order.countDocuments(query);

    if (totalOrders === 0) {
      throw new HttpError(404, `Orders not found`);
    }
    if (skip >= totalOrders) {
      throw new HttpError(404, `No more Orders available on page ${page}`);
    }
    const orders = await Order.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      totalOrders,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / pageSize),
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(error);
  }
};

export default {
  getAll: ctrlWrapper(getAll),
};
