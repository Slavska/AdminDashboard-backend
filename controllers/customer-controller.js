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
    const { page = 1, name } = req.query;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    const totalCustomers = await Customer.countDocuments(query);

    if (totalCustomers === 0) {
      throw new HttpError(404, `Customers not found`);
    }
    if (skip >= totalCustomers) {
      throw new HttpError(404, `No more Customers available on page ${page}`);
    }
    const customers = await Customer.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      totalCustomers,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalCustomers / pageSize),
      customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    next(error);
  }
};
export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
};
