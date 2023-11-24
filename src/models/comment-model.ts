import { Expose, Transform } from "class-transformer";
import { ObjectId } from "mongodb";

export class CommentModel {
    @Transform((value) => value.obj._id.toString())
    @Expose()
    _id?: ObjectId;

    @Expose()
    productId: string;

    @Expose()
    userId: string;

    @Expose()
    parentId?: string;

    @Expose()
    content: string;
}