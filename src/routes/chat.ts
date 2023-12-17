import express from "express";
import { isAuth } from "../utils/authentication-helper";

import createConversationHandler from "../controllers/chat/create-conversation-handler";

const chatRouter = express.Router();

chatRouter.post("", isAuth, createConversationHandler);

export default chatRouter;
