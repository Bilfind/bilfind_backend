import { Expose, Transform } from "class-transformer";
import { ObjectId } from "mongodb";
import { LocationModel } from "./location-model";

export class MessageModel {
    @Transform((value) => value.obj._id.toString())
    @Expose()
    _id?: ObjectId;

    @Expose()
    conversationId: string;

    @Expose()
    senderId: string;

    @Expose()
    receiverId: string;

    @Expose()
    createdAt: string;

    @Expose()
    text?: string;

    @Expose()
    imageSrc?: string;

    @Expose()
    location?: LocationModel;

    @Expose()
    messageType: MessageType;
}

enum MessageType {
    TEXT,
    IMAGE,
    LOCATION
}