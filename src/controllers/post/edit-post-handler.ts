import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { IsString } from "class-validator";
import { User } from "../../models/user-model";
import { PostClient } from "../../clients/post-client";

export class EditPostRequest {
  @Expose()
  @IsString()
  postId: string;

  @Expose()
  @IsString()
  title?: string;

  @Expose()
  @IsString()
  content?: string;

  @Expose()
  price?: number;

  @Expose()
  images?: string[];
}

// base endpoint structure
const editPostHandler = async (req: Request, res: Response) => {
  Logging.info(JSON.stringify(req.query, Object.getOwnPropertyNames(req.body)));
  try {
    const editPostRequest: EditPostRequest = Mapper.map(EditPostRequest, req.body);

    // @ts-ignore
    const locals = req.locals;
    const user: User = locals.user;
    const userId = user._id!.toString();

    const updated = await PostClient.editPost(
      editPostRequest, 
      userId
    );

    if (!updated) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be edited");
    }

    const post = await PostClient.getPostById(editPostRequest.postId);

    if (!post) {
      return ApiHelper.getErrorResponseForCrash(res, "Post could not be edited");
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

export default editPostHandler;
