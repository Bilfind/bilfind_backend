import express from "express";
import postRegister from "../controllers/auth/post-register";
import putVerifyRegistirationOtp from "../controllers/auth/put-verify-registiration-otp";
import postLogin from "../controllers/auth/post-login";

const authRouter = express.Router();

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);
authRouter.put("/register/otp", putVerifyRegistirationOtp);

export default authRouter;