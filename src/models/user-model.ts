import { Expose, Transform } from "class-transformer";
import { Departmant } from "../utils/enums";
import { ObjectId } from "mongodb";
import { Mapper } from "../utils/mapper";

export class User {
    @Transform((value) => value.obj._id.toString())
    @Expose()
    _id?: ObjectId;

    @Expose()
    email: string;

    @Expose()
    hashedPassword: string;

    @Expose()
    name: string;

    @Expose()
    profilePhoto?: string;

    @Expose()
    familyName: string;

    @Expose()
    departmant: Departmant;

    @Expose()
    latestStatus: UserStatus;

    @Expose()
    favoritePostIds: string[];
}

export class UserResponseDTO {
    @Expose()
    id: String;

    @Expose()
    email: string;

    @Expose()
    name: string;

    @Expose()
    profilePhoto?: string;

    @Expose()
    familyName: string;

    @Expose()
    departmant: Departmant;

    @Expose()
    latestStatus: UserStatus;

    @Expose()
    favoritePostIds: string[];
}

export const mapToUserResponseDTO = (user: User): UserResponseDTO => {
    return Mapper.map(User, {
        ...user,
        id: user._id!.toString(),
    });
}

export enum UserStatus {
    WAITING = "WAITING",
    VERIFIED = "VERIFIED",
    BANNED = "BANNED"
}