import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const product = new Schema(
  {
    id: {
      type: String,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

product.pre("findOneAndUpdate", runValidateAtUpdate);

product.post("save", handleSaveError);

product.post("findOneAndUpdate", handleSaveError);

const Product = model("product", product);

export default Product;
