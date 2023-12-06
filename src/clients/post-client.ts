import mongoose from "mongoose";
import { Mapper } from "../utils/mapper";
import Logging from "../utils/logging";
import { ObjectId } from "mongodb";
import { PostModel, PostType } from "../models/post-model";
import { EditPostRequest } from "../controllers/post/edit-post-handler";
import { GetPostListRequest } from "../controllers/post/get-post-list-handler";
import { PostCommentRequest } from "../controllers/post/post-comment-handler";
import { CommentModel } from "../models/comment-model";
import { User } from "../models/user-model";

export class PostClient {
  static async getCommentById(commentId: string): Promise<CommentModel | null> {
    try {
      const db = mongoose.connection.db;
      const commentCollection = db.collection("comment");

      const data = await commentCollection.findOne({ _id: new mongoose.Types.ObjectId(commentId), isDeleted: false});

      const comment: CommentModel = Mapper.map(CommentModel, data);
      if (!comment) {
        Logging.error("Comment not found with id " + commentId);
        return null;
      }

      Logging.info("Comment is retrieved by id {}", commentId);

      return comment;
    } catch (error) {
      Logging.error(error);
      return null;
    }
  }

  static async getPostComments(postId: string): Promise<CommentModel[]> {
    try {
      const db = mongoose.connection.db;
      const commentCollection = db.collection("comment");

      const dataCursor = commentCollection.find({ postId, isDeleted: false});
      const postComments = (await dataCursor.toArray()).map((dataItem) => Mapper.map(CommentModel, dataItem));

      return postComments;
    } catch (error) {
      Logging.error(error);
      return [];
    }
  }

  static async createComment(
    postCommentRequest: PostCommentRequest,
    user: User
  ): Promise<ObjectId | null> {
    try {
      const db = mongoose.connection.db;
      const commentCollection = db.collection("comment");

      const comment: CommentModel = {
        content: postCommentRequest.content,
        postId: postCommentRequest.postId,
        userId: user._id!.toString(),
        parentId: postCommentRequest.parentId,
        createdAt: new Date(),
        isDeleted: false,
      };

      const result = await commentCollection.insertOne(comment);
      Logging.info("Comment successfully created by id: ", result.insertedId._id.toString());

      return result.insertedId._id;
    } catch (error) {
      Logging.error(error);
      return null;
    }
  }

  static async deleteComment(commentId: string): Promise<boolean> {
    try {
      const db = mongoose.connection.db;
      const commentCollection = db.collection("comment");

      const filter = { $or: [{_id: new mongoose.Types.ObjectId(commentId)}, {parentId: commentId }] };
      const update = {
        $set: {
          isDeleted: true,
        },
      };
      const data = await commentCollection.updateMany(filter, update);

      Logging.info("Comments are deleted by id {}", commentId);

      return data.modifiedCount > 0;
    } catch (error) {
      Logging.error(error);
      return false;
    }
  }

  // Post
  static async createPost(
    title: string,
    content: string,
    type: PostType,
    userId: string,
    price?: number,
    images?: string[]
  ): Promise<ObjectId | null> {
    try {
      const db = mongoose.connection.db;
      const postCollection = db.collection("post");

      const post: PostModel = {
        title,
        content,
        type,
        price: price,
        userId,
        images: images,
        createdAt: new Date(),
        isDeleted: false,
      };

      const result = await postCollection.insertOne(post);
      Logging.info("Post successfully created by id: ", result.insertedId._id.toString());

      return result.insertedId._id;
    } catch (error) {
      Logging.error(error);
      return null;
    }
  }

  static async getPosts(getPostListRequest: GetPostListRequest) {
    const db = mongoose.connection.db;
    const postCollection = db.collection("post");
    let filter: any = { isDeleted: false };

    if (getPostListRequest.type) {
      filter.type = getPostListRequest.type;
    }

    if (getPostListRequest.key) {
      const regex = new RegExp(getPostListRequest.key!);
      filter = {
        ...filter,
        $or: [
          {
            content: { $regex: regex }
          },
          {
            title: { $regex: regex }
          }
        ]
      }
    }


    const dataCursor = postCollection.find(filter, { sort: { createdAt: -1 } });
    const posts = (await dataCursor.toArray()).map((dataItem) => Mapper.map(PostModel, dataItem));

    return posts;
  }

  static async getPostsByIdList(postIdList: string[]) {
    const db = mongoose.connection.db;
    const postCollection = db.collection("post");

    const objectIdList = postIdList.map((postId) => new mongoose.Types.ObjectId(postId));
    const filter: any = { isDeleted: false, _id: {$in: objectIdList} };

    const dataCursor = postCollection.find(filter, { sort: { createdAt: -1 } });
    const posts = (await dataCursor.toArray()).map((dataItem) => Mapper.map(PostModel, dataItem));

    return posts;
  }

  static async getPostsByUserId(userId: string) {
    const db = mongoose.connection.db;
    const postCollection = db.collection("post");

    const filter: any = { isDeleted: false, userId: userId };

    const dataCursor = postCollection.find(filter, { sort: { createdAt: -1 } });
    const posts = (await dataCursor.toArray()).map((dataItem) => Mapper.map(PostModel, dataItem));

    return posts;
  }

  static async editPost(eidtPostFilter: EditPostRequest, userId: string): Promise<boolean> {
    try {
      const db = mongoose.connection.db;
      const postCollection = db.collection("post");

      const filter = { _id: new mongoose.Types.ObjectId(eidtPostFilter.postId), userId: userId };
      const update = {
        $set: {
          title: eidtPostFilter.title,
          content: eidtPostFilter.content,
          price: eidtPostFilter.price ? +eidtPostFilter.price : null,
          images: eidtPostFilter.images,
        },
      };

      const result = await postCollection.updateOne(filter, update);
      Logging.info("Post successfully updated with id", eidtPostFilter.postId);

      return true;
    } catch (error) {
      Logging.error(error);
      return false;
    }
  }

  static async getPostById(id: string): Promise<PostModel | null> {
    try {
      const db = mongoose.connection.db;
      const postCollection = db.collection("post");

      const data = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id), isDeleted: false });

      const post: PostModel = Mapper.map(PostModel, data);
      if (!post) {
        Logging.error("Post not found with id " + id);
        return null;
      }

      Logging.info("Post is retrieved by id {}", id);

      return post;
    } catch (error) {
      Logging.error(error);
      return null;
    }
  }
}
