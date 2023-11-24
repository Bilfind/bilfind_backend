import mongoose from "mongoose";
import { Mapper } from "../utils/mapper";
import Logging from "../utils/logging";
import { Otp, OtpType } from "../models/otp-model";
import { ObjectId } from "mongodb";
import { PostModel, PostType } from "../models/post-model";
import { EditPostRequest } from "../controllers/post/edit-post-handler";

export class PostClient {
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
      };

      const result = await postCollection.insertOne(post);
      Logging.info("Post successfully created by id: ", result.insertedId._id.toString());

      return result.insertedId._id;
    } catch (error) {
      Logging.error(error);
      return null;
    }
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
          price: eidtPostFilter.price,
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

      const data = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });

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
