import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { IsEnum, IsString } from "class-validator";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";
import { PostType } from "../../models/post-model";

class CreatePostRequest {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsEnum(PostType)
  type: PostType;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  price: number;
}

// base endpoint structure
const createPostHandler = async (req: Request, res: Response) => {
  Logging.info(JSON.stringify(req.query, Object.getOwnPropertyNames(req.body)));
  try {
    const createPostRequest: CreatePostRequest = Mapper.map(CreatePostRequest, req.body);

    // @ts-ignore
    const locals = req.locals;
    const user: User = locals.user;
    const userId = user._id!.toString();

    const createdPostId = await PostClient.createPost(
      createPostRequest.title,
      createPostRequest.content,
      createPostRequest.type,
      userId,
      createPostRequest.price,
      []
    );

    if (!createdPostId) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be created");
    }

    const post = await PostClient.getPostById(createdPostId.toString());

    if (!post) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be created");
    }

    return ApiHelper.getSuccessfulResponse(res, post);
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(Object.getOwnPropertyNames(req)));
  }
};

export default createPostHandler;