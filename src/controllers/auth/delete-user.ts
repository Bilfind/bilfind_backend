import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import Logging from "../../utils/logging";
import { ApiErrorCode } from "../../utils/error-codes";
import { UserClient } from "../../clients/user-client";
import { IsNumber, IsString, validate } from "class-validator";
import { OtpClient } from "../../clients/otp-client";
import { UserStatus } from "../../models/user-model";

class DeleteUserRequest {
  @Expose()
  @IsString()
  email: string;
}

// base endpoint structure
const deleteUser = async (req: Request, res: Response) => {
  Logging.info(JSON.stringify(req.query, Object.getOwnPropertyNames(req.query)));
  try {
    const deleteUserRequest: DeleteUserRequest = Mapper.map(
      DeleteUserRequest,
        req.query
    );

    const user = await UserClient.getUserByEmail(deleteUserRequest.email);
    if (!user) {
      return ApiHelper.getErrorResponse(res, 403, [
        {
          errorCode: ApiErrorCode.EMAIL_DOES_NOT_EXISTS,
          message: "Email does not exists",
        },
      ]);
    }

    const deleteResult = await UserClient.deleteUserByEmail(user.email);
    
    if (deleteResult) {
      user.latestStatus = UserStatus.VERIFIED;
      return ApiHelper.getSuccessfulResponse(res, { message: "User successfully deleted" });
    }

    return ApiHelper.getErrorResponseForCrash(res, "User could not be deleted");
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(Object.getOwnPropertyNames(req)));
  }
};

export default deleteUser;
