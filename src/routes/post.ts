import express from "express";
import { isAuth } from "../utils/authentication-helper";
import createPostHandler from "../controllers/post/create-post-handler";
import editPostHandler from "../controllers/post/edit-post-handler";
import { imageUpload } from "../utils/storage-helper";
import getPostListHandler from "../controllers/post/get-post-list-handler";
import postCommentHandler from "../controllers/post/post-comment-handler";
import getPostDetailHandler from "../controllers/post/get-post-detail-handler";
import deleteCommentHandler from "../controllers/post/delete-comment-handler";

const postRouter = express.Router();

postRouter.post("", isAuth, createPostHandler);
postRouter.put("", isAuth, imageUpload.array("image"), editPostHandler);
postRouter.get("/list", isAuth, getPostListHandler);
postRouter.get("/:postId/", isAuth, getPostDetailHandler);
postRouter.post("/comment", isAuth, postCommentHandler);
postRouter.delete("/comment", isAuth, deleteCommentHandler);

export default postRouter;
