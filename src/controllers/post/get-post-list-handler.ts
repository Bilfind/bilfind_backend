import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { IsString } from "class-validator";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";
import { Multer } from "multer";
import { PostModel, PostType } from "../../models/post-model";

export class GetPostListRequest {
  @Expose()
  title?: string;

  @Expose()
  content?: string;

  @Expose()
  type?: PostType;
}

// base endpoint structure
const getPostListHandler = async (req: Request, res: Response) => {
  Logging.info(JSON.stringify(req.query, Object.getOwnPropertyNames(req.body)));
  try {
    const getPostListRequest: GetPostListRequest = Mapper.map(GetPostListRequest, req.body);

    const postList: PostModel[] = await PostClient.getPosts(getPostListRequest);

    return ApiHelper.getSuccessfulResponse(res, postList);
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(Object.getOwnPropertyNames(req)));
  }
};

export default getPostListHandler;
