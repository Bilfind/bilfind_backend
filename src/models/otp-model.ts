import { Expose } from "class-transformer";
import { Departmant } from "../utils/enums";
import { ObjectId } from "mongodb";

export class Otp {
    @Expose()
    _id?: ObjectId;

    @Expose()
    email: string;

    @Expose()
    createdAt: Date;

    @Expose()
    validUntil: Date;

    @Expose()
    code: number;

    @Expose()
    type: OtpType;

}

export enum OtpType {
    REGISTER,
    RESET
}