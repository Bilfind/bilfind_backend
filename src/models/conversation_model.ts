import { Expose, Transform, Type } from "class-transformer";
import { ObjectId } from "mongodb";
import { MessageModel } from "./message-model";
import { IsEnum } from "class-validator";

export enum ConversationStatus {
  WAITING = "WAITING",
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}

export class ConversationModel {
  @Transform((value) => value.obj._id.toString())
  @Expose()
  _id?: ObjectId;

  @Expose()
  postId: string;

  @Expose()
  senderUserId: string;

  @Expose()
  postOwnerUserId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @IsEnum(ConversationStatus)
  status: ConversationStatus;

  @Expose()
  @Type(() => MessageModel)
  messages: MessageModel[];
}
