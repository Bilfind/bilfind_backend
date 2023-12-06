import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";
import { PostModel, PostType, mapToPostResponseDTO } from "../../models/post-model";
import { UserClient } from "../../clients/user-client";

export class GetPostListRequest {
  @Expose()
  key?: string;

  @Expose()
  type?: PostType;
}

// base endpoint structure
const getPostListHandler = async (req: Request, res: Response) => {
  Logging.info(JSON.stringify(req.query, Object.getOwnPropertyNames(req.body)));
  try {
    const getPostListRequest: GetPostListRequest = Mapper.map(GetPostListRequest, req.body);

    const postList: PostModel[] = await PostClient.getPosts(getPostListRequest);

    const postOwnerIdList = postList.map(post => post.userId);
    const users = await UserClient.getUsersByListId(postOwnerIdList);
    const userMap: Record<string, User> = {};
    users.forEach((user) => userMap[user._id!.toString()] = user);
    const getPostDTOList = postList.map(post => mapToPostResponseDTO(post, userMap[post.userId])); 

    return ApiHelper.getSuccessfulResponse(res, {posts: getPostDTOList});
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(Object.getOwnPropertyNames(req)));
  }
};

export default getPostListHandler;
