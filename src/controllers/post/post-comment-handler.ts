import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { IsEnum, IsString } from "class-validator";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";
import { PostType } from "../../models/post-model";

export class PostCommentRequest {
  @Expose()
  @IsString()
  postId: string;

  @Expose()
  parentId?: string;

  @Expose()
  @IsString()
  content: string;
}

// base endpoint structure
const postCommentHandler = async (req: Request, res: Response) => {
  Logging.info(JSON.stringify(req.query, Object.getOwnPropertyNames(req.body)));
  try {
    const postCommentRequest: PostCommentRequest = Mapper.map(PostCommentRequest, req.body);

    // @ts-ignore
    const locals = req.locals;
    const user: User = locals.user;

    const post = await PostClient.getPostById(postCommentRequest.postId);

    if (!post) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be created");
    }

    if (postCommentRequest.parentId) {
        const comment = await PostClient.getCommentById(postCommentRequest.parentId);

        if (!comment) {
          return ApiHelper.getErrorResponseForCrash(res, "Parent comment not found with id " + postCommentRequest.parentId);
        }
    }

    const createdCommentId = await PostClient.createComment(
      postCommentRequest,
      user
    );

    if (!createdCommentId) {
      return ApiHelper.getErrorResponseForCrash(res, "Comment could not be created");
    }

    const comment = await PostClient.getCommentById(createdCommentId.toString());

    if (!comment) {
      return ApiHelper.getErrorResponseForCrash(res, "Comment could not be created");
    }

    return ApiHelper.getSuccessfulResponse(res, comment);
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(Object.getOwnPropertyNames(req)));
  }
};

export default postCommentHandler;
