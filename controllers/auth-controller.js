import { ctrlWrapper } from "../decorators/index.js";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { HttpError, handleGetDashboardsData } from "../helpers/index.js";
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatarURL,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const owner = user._id;
  const dashboards = await handleGetDashboardsData(owner);
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  const { name } = user;
  res.json({
    token,
    name,
    email,
    dashboards,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Signout success",
  });
};

const getCurrent = async (req, res) => {
  const { name, _id: owner, email } = req.user;
  const dashboards = await handleGetDashboardsData(owner);
  res.json({
    name,
    email,
    dashboards,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
};
