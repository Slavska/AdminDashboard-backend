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
    const products = await Product.find({});

    if (!products || products.length === 0) {
      throw HttpError(404, `Products not found`);
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
  }
};
const getByName = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(HttpError(400, "Name parameter is required"));
  }

  try {
    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!products || products.length === 0) {
      throw HttpError(404, `No products found for name ${name}`);
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by name:", error);
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
  getByName: ctrlWrapper(getByName),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  add: ctrlWrapper(add),
};
