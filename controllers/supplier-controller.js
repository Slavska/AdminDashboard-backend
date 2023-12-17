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
    const suppliers = await Supplier.find({});

    if (!suppliers || suppliers.length === 0) {
      throw HttpError(404, `supplier not found`);
    }

    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    next(error);
  }
};
const getByName = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(HttpError(400, "Name parameter is required"));
  }

  try {
    const suppliers = await Supplier.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!suppliers || suppliers.length === 0) {
      throw HttpError(404, `No suppliers found for name ${name}`);
    }

    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers by name:", error);
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
