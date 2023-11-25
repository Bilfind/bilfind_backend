import express from "express";
import { isAuth } from "../utils/authentication-helper";
import createPostHandler from "../controllers/post/create-post-handler";
import editPostHandler from "../controllers/post/edit-post-handler";
import { imageUpload } from "../utils/storage-helper";
import getPostListHandler from "../controllers/post/get-post-list-handler";

const postRouter = express.Router();

postRouter.post("", isAuth, createPostHandler);
postRouter.put("", isAuth, imageUpload.array("image"), editPostHandler);
postRouter.get("/list", isAuth, getPostListHandler);

export default postRouter;
