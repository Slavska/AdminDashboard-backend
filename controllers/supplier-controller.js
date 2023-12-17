import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import Supplier from "../models/supplier.js";

const add = async (req, res, next) => {
  const result = await Supplier.create({ ...req.body });
  res.status(201).json(result);
};

const getById = async (req, res, next) => {
  const { supplierId } = req.params;
  const result = await Supplier.findById(supplierId);
  if (!result) {
    throw HttpError(404, `Supplier with id=${supplierId} not found`);
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
    const totalSuppliers = await Supplier.countDocuments(query);

    if (totalSuppliers === 0) {
      throw new HttpError(404, `Suppliers not found`);
    }
    if (skip >= totalSuppliers) {
      throw new HttpError(404, `No more Suppliers available on page ${page}`);
    }
    const suppliers = await Supplier.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      totalSuppliers,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalSuppliers / pageSize),
      suppliers,
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    next(error);
  }
};

const updateById = async (req, res) => {
  const { supplierId } = req.params;
  const result = await Supplier.findByIdAndUpdate(supplierId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `supplier with id=${supplierId} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { supplierId } = req.params;
  const result = await Supplier.findByIdAndDelete(supplierId);
  await Supplier.deleteMany({});

  if (!result) {
    throw HttpError(404, `supplier with id=${supplierId} not found`);
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
