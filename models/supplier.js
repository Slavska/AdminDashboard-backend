import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const supplier = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

supplier.pre("findOneAndUpdate", runValidateAtUpdate);

supplier.post("save", handleSaveError);

supplier.post("findOneAndUpdate", handleSaveError);

const Supplier = model("supplier", supplier);

export default Supplier;
