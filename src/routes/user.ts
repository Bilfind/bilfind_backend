import express from "express";
import putUserFavHandler from "../controllers/user/put-user-fav-handler";
import { isAuth } from "../utils/authentication-helper";

const userRouter = express.Router();

userRouter.put("/fav", isAuth, putUserFavHandler);

export default userRouter;
