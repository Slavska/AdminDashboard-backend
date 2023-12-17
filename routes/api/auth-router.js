import express from "express";
import userSchemas from "../../schemas/user-schemas.js";
import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";
import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

const userSignUpValidate = validateBody(userSchemas.userRegistrationSchema);
const userSignInValidate = validateBody(userSchemas.userLogInSchema);

authRouter.post("/signup", userSignUpValidate, authController.signup);

authRouter.post("/login", userSignInValidate, authController.signin);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.get("/user-info", authenticate, authController.getCurrent);

export default authRouter;
