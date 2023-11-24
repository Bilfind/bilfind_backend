import express from "express";
import { isAuth } from "../utils/authentication-helper";
import createPostHandler from "../controllers/post/create-post-handler";
import editPostHandler from "../controllers/post/edit-post-handler";

const postRouter = express.Router();

postRouter.post("", isAuth, createPostHandler);
postRouter.put("", isAuth, editPostHandler);

export default postRouter;
