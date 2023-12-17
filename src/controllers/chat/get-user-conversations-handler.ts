import { Request, Response } from "express";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";
import { PostModel, PostResponseDTO, mapToPostResponseDTO } from "../../models/post-model";
import { ReportModel, mapToReportResponseDTO } from "../../models/report-model";
import { ReportClient } from "../../clients/report-client";
import { ChatClient } from "../../clients/chat-client";
import { UserClient } from "../../clients/user-client";
import {
  ConversationModel,
  ConversationResponseDto,
  mapToConversationResponseDTO,
} from "../../models/conversation_model";

// base endpoint structure
const getUserConversationsHandler = async (req: Request, res: Response) => {
  Logging.info(JSON.stringify(req.query, Object.getOwnPropertyNames(req.body)));
  try {
    // @ts-ignore
    const locals = req.locals;
    const user: User = locals.user;

    const conversations: ConversationModel[] = await ChatClient.getUserConversations(user._id!.toString());

    // get posts
    const postIdList = conversations.map((conv) => conv.postId);
    const posts = await PostClient.getReportedPost(postIdList);
    const postMap: Record<string, PostModel> = {};
    posts.forEach((post) => (postMap[post._id!.toString()] = post));

    const postOwnerIdList = [
      ...posts.map((post) => post.userId),
      ...conversations.map((conv) => conv.senderUserId),
      ...conversations.map((conv) => conv.postOwnerUserId),
    ];
    const users = await UserClient.getUsersByListId(postOwnerIdList);
    const userMap: Record<string, User> = {};
    users.forEach((user) => (userMap[user._id!.toString()] = user));

    const postDTOMap: Record<string, PostResponseDTO> = {};
    for (const post of posts) {
      const postUser = userMap[post.userId];
      if (!postUser) {
        Logging.error("User not found when mapping " + post.userId);
        continue;
      }

      const postResponseDTO = mapToPostResponseDTO(post, postUser);
      postDTOMap[post._id!.toString()] = postResponseDTO;
    }

    const conversationResponseDtos: ConversationResponseDto[] = [];
    for (const conv of conversations) {
      const senderUser = userMap[conv.senderUserId];
      const postOwner = userMap[conv.postOwnerUserId];
      const postDto = postDTOMap[conv.postId];

      if (!senderUser || !postOwner || !postDto) {
        Logging.error("Required data not found to map conversation response dto " + conv._id!.toString());
        continue;
      }

      const conversationResponseDto = mapToConversationResponseDTO(conv, postDto, senderUser, postOwner);
      conversationResponseDtos.push(conversationResponseDto);
    }

    return ApiHelper.getSuccessfulResponse(res, { conversations: conversationResponseDtos });
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(Object.getOwnPropertyNames(req)));
  }
};

export default getUserConversationsHandler;
