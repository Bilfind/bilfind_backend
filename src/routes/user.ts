import express from "express";
import putUserFavHandler from "../controllers/user/put-user-fav-handler";
import { isAuth } from "../utils/authentication-helper";
import { imageUpload } from "../utils/storage-helper";
import putUserProfilePhotoHandler from "../controllers/user/put-user-profile-photo-handler";
import getUserReportsHandler from "../controllers/user/get-user-report-handler";

const userRouter = express.Router();

userRouter.put("/fav", isAuth, putUserFavHandler);
userRouter.put("/photo", isAuth, imageUpload.single("image"), putUserProfilePhotoHandler);
userRouter.get("/reports", isAuth, getUserReportsHandler);
userRouter.get("", isAuth, getUserReportsHandler);

export default userRouter;
