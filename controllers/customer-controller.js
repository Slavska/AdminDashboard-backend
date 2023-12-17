import { ctrlWrapper } from "../decorators/index.js";
import Customer from "../models/customer.js";
import { HttpError } from "../helpers/index.js";

const getById = async (req, res, next) => {
  const { customerId } = req.params;
  const result = await Customer.findById(customerId);
  if (!result) {
    throw HttpError(404, `Customer with id=${customerId} not found`);
  }
  res.status(201).json(result);
};

const getAll = async (req, res, next) => {
  try {
    const orders = await Customer.find({});

    if (!orders || orders.length === 0) {
      throw HttpError(404, `Customer not found`);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(error);
  }
};
export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
};
