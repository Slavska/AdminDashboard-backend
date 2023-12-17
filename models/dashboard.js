import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const dashboard = new Schema(
  {
    name: {
      type: String,
      required: function () {
        return !this.description;
      },
    },
    description: {
      type: String,
      required: function () {
        return !this.name;
      },
    },
    amount: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

dashboard.pre("findOneAndUpdate", runValidateAtUpdate);

dashboard.post("save", handleSaveError);

dashboard.post("findOneAndUpdate", handleSaveError);

const Dashboard = model("dashboard", dashboard);

export default Dashboard;
