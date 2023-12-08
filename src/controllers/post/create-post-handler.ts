import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { IsEnum, IsString } from "class-validator";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";
import { PostType } from "../../models/post-model";
import { UserClient } from "../../clients/user-client";

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

    const files = req.files;
    console.log(files);

    const images: string[] = [];
    if (files && typeof files.length === "number") {
      for (let i = 0; i < (files.length as number); i++) {
        const file = (files as any[])[i];
        images.push(file.location);
      }
    }

    const createdPostId = await PostClient.createPost(
      createPostRequest.title,
      createPostRequest.content,
      createPostRequest.type,
      userId,
      createPostRequest.price,
      images
    );

    if (!createdPostId) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be created");
    }

    const post = await PostClient.getPostById(createdPostId.toString());

    if (!post) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be created");
    }

    const userUpdated = await UserClient.userPutOwnPost(userId, post._id!.toString());
    if (!userUpdated) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be added to users own posts");
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
