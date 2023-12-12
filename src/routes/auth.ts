import express from "express";
import postRegister from "../controllers/auth/post-register";
import putVerifyRegistirationOtp from "../controllers/auth/put-verify-registiration-otp";
import postLogin from "../controllers/auth/post-login";
import deleteUser from "../controllers/auth/delete-user";
import { isAuth } from "../utils/authentication-helper";
import getValidateToken from "../controllers/auth/get-validate-token";
import changePasswordHandler from "../controllers/auth/change-password-handler";

const authRouter = express.Router();

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);
authRouter.put("/password", isAuth, changePasswordHandler);
authRouter.put("/register/otp", putVerifyRegistirationOtp);
authRouter.delete("/user", deleteUser);
authRouter.get("/validate", isAuth, getValidateToken);

export default authRouter;
