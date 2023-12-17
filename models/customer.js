import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const customer = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    spent: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

customer.pre("findOneAndUpdate", runValidateAtUpdate);

customer.post("save", handleSaveError);

customer.post("findOneAndUpdate", handleSaveError);

const Customer = model("customer", customer);

export default Customer;
