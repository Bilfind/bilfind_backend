import { Request, Response } from "express";
import { ApiHelper } from "../../utils/api-helper";
import * as _ from "lodash";
import Logging from "../../utils/logging";
import { ApiErrorCode } from "../../utils/error-codes";
import { User } from "../../models/user-model";

// get validate token
const getValidateToken = (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user: User = req.locals.user;

    if (!user) {
      return ApiHelper.getErrorResponse(res, 400, [
        {
          errorCode: ApiErrorCode.UNAUTHORIZED,
          message: "User could not be authenticated",
        },
      ]);
    }

    ApiHelper.getSuccessfulResponse(res, { message: "successfully validated token!" , user});
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(Object.getOwnPropertyNames(req)));
  }
};

export default getValidateToken;