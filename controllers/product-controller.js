import { ctrlWrapper } from "../decorators/index.js";
import Product from "../models/product.js";
import { HttpError } from "../helpers/index.js";

const add = async (req, res, next) => {
  const result = await Product.create({ ...req.body });
  res.status(201).json(result);
};

const getById = async (req, res, next) => {
  const { productId } = req.params;
  const result = await Product.findById(productId);
  if (!result) {
    throw HttpError(404, `Product with id=${productId} not found`);
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
    const totalProducts = await Product.countDocuments(query);

    if (totalProducts === 0) {
      throw new HttpError(404, `Products not found`);
    }
    if (skip >= totalProducts) {
      throw new HttpError(404, `No more products available on page ${page}`);
    }
    const products = await Product.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      totalProducts,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / pageSize),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
  }
};

const updateById = async (req, res) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Product with id=${productId} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndDelete(productId);
  await Product.deleteMany({});

  if (!result) {
    throw HttpError(404, `Product with id=${productId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};
export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  add: ctrlWrapper(add),
};
