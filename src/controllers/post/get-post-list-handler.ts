import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";
import { PostModel, PostType, mapToPostResponseDTO } from "../../models/post-model";
import { UserClient } from "../../clients/user-client";

export class SearchFilterModel {
  @Expose()
  public key?: string;
  
  @Expose()
  public types?: string[];

  @Expose()
  public minPrice?: number;

  @Expose()
  public maxPrice?: number;
}

// base endpoint structure
const getPostListHandler = async (req: Request, res: Response) => {
  try {
    let {key, types} = req.query;

    const searchFilterModel: SearchFilterModel = mapQueryToFilter(req.query);

    const postList: PostModel[] = await PostClient.getPosts(searchFilterModel);

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

function mapQueryToFilter(query: any): SearchFilterModel {
  return {
    key: query.key as string,
    types: Array.isArray(query.types) ? query.types : undefined,
    minPrice: query.minPrice ? parseInt(query.minPrice as string, 10) : undefined,
    maxPrice: query.maxPrice ? parseInt(query.maxPrice as string, 10) : undefined,
  };
}

export default getPostListHandler;
