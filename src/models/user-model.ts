import { Expose } from "class-transformer";
import { Departmant } from "../utils/enums";
import { ObjectId } from "mongodb";

export class User {
    @Expose()
    _id?: ObjectId;

    @Expose()
    email: string;

    @Expose()
    hashedPassword: string;

    @Expose()
    name: string;

    @Expose()
    familyName: string;

    @Expose()
    departmant: Departmant;

    @Expose()
    latestStatus: UserStatus;

}

export enum UserStatus {
    WAITING = "WAITING",
    VERIFIED = "VERIFIED",
    BANNED = "BANNED"
}