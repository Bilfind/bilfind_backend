import { Expose, Transform } from "class-transformer";
import { IsEnum } from "class-validator";
import { ObjectId } from "mongodb";

export enum PostType {
  SALE = "SALE",
  BORROW = "BORROW",
  DONATION = "DONATION",
  FOUND = "FOUND",
  REQUEST = "REQUEST",
  LOST = "LOST",
}

export class PostModel {
  @Transform((value) => value.obj._id.toString())
  @Expose()
  _id?: ObjectId;

  @Expose()
  userId: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  images?: string[];

  @Expose()
  price?: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @IsEnum(PostType)
  type: PostType;
}
