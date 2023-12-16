import express from "express";
import putUserFavHandler from "../controllers/user/put-user-fav-handler";
import { isAuth } from "../utils/authentication-helper";
import { imageUpload } from "../utils/storage-helper";
import putUserProfilePhotoHandler from "../controllers/user/put-user-profile-photo-handler";
import getReportHandler from "../controllers/admin/get-report-handler";
import putAdminReportHandler from "../controllers/admin/put-report-handler";

const adminRouter = express.Router();

adminRouter.get("/report", isAuth, getReportHandler);
adminRouter.put("/:reportId/:status", isAuth, putAdminReportHandler);

export default adminRouter;
