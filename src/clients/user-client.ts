import mongoose from "mongoose";
import { User, UserStatus } from "../models/user-model";
import { Mapper } from "../utils/mapper";
import Logging from "../utils/logging";
import { Departmant } from "../utils/enums";
import { ObjectId, UpdateResult } from "mongodb";

export class UserClient {

  static async deleteUserByEmail(email: string): Promise<boolean> {
    try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");

        const deleteResult = await userCollection.deleteOne({ email })

        Logging.info("User is retrieved by email", email);
    
        return deleteResult.deletedCount > 0;
      } catch (error) {
        Logging.error(error);
        return false;
      }
}

    static async getUserById(id: string): Promise<User | null> {
        try {
            const db = mongoose.connection.db;
            const userCollection = db.collection("user");
    
            const data = await userCollection.findOne({_id: new mongoose.Types.ObjectId(id)})
    
            const user: User = Mapper.map(User, data);
            if (!user) {
              Logging.error("User not found with id " + id);
              return null;
            }

            Logging.info("User is retrieved by id {}", id);
        
            return user;
          } catch (error) {
            Logging.error(error);
            return null;
          }
    }

    static async getUsersByListId(idList: string[]): Promise<User[]> {
      try {
          const db = mongoose.connection.db;
          const userCollection = db.collection("user");
  
          const dataCursor = userCollection.find({_id: {$in: idList.map(id => new mongoose.Types.ObjectId(id))}})
          const users = (await dataCursor.toArray()).map((dataItem) => Mapper.map(User, dataItem));
         
          Logging.info("Users are retrieved by id {}", idList);
      
          return users;
        } catch (error) {
          Logging.error(error);
          return [];
        }
  }

  static async getUsersByRegex(key: string): Promise<User[]> {
    try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");

        const regex = new RegExp(key, "i");
        const filter = {
          $or: [
            {
              email: { $regex: regex }
            },
            {
              name: { $regex: regex }
            },
            {
              familyName: { $regex: regex }
            }
          ]
        };

        console.log("filter", filter.$or);

        const dataCursor = userCollection.find(filter)
        const users = (await dataCursor.toArray()).map((dataItem) => Mapper.map(User, dataItem));
       
        Logging.info("Users are retrieved by key ", key);
    
        return users;
      } catch (error) {
        Logging.error(error);
        return [];
      }
}

    static async getUserByEmail(email: string): Promise<User | null> {
        try {
            const db = mongoose.connection.db;
            const userCollection = db.collection("user");
    
            const data = await userCollection.findOne({email})
            
            console.log(data);
    
            const user: User = Mapper.map(User, data);
            if (!user) {
                return null;
            }
            Logging.info("User is retrieved by id ", email);
            
        
            return user;
          } catch (error) {
            Logging.error(error);
            return null;
          }
    }

    static async updateStatus(email: string, status: UserStatus): Promise<boolean> {
      try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");
        
        const filter = { email };

        const update = {
          $set: {
            latestStatus: status,
          }
        }
        
        const result: UpdateResult = await userCollection.updateOne(filter, update);
        Logging.info("User successfully updated: ", status)

        return result.modifiedCount > 0;
      } catch (error) {
        Logging.error(error);
        return false;
      }
    }

    static async createUser(email: string, hashedPassword: string, name: string, familyName: string, departmant: Departmant): Promise<ObjectId | null> {
        try {
            const db = mongoose.connection.db;
            const userCollection = db.collection("user");
        
            const user: User = {
                email,
                hashedPassword,
                name,
                familyName,
                departmant,
                createdAt: new Date(),
                latestStatus: UserStatus.WAITING,
                favoritePostIds: [],
                ownPostIds: []
            }
            
            const result = await userCollection.insertOne(user);
            Logging.info("User successfully created by id: ", result.insertedId._id.toString())

            return result.insertedId._id;
          } catch (error) {
            Logging.error(error);
            return null;
          }
    }

    static async userPutFavorite(userId: string, postId: string) {
      try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");
        
        const filter = { _id: new mongoose.Types.ObjectId(userId)};

        const update = {
          $push: {
            favoritePostIds: postId,
          }
        }
        
        const result: UpdateResult = await userCollection.updateOne(filter, update);
        Logging.info("User favorites successfully updated");

        return result.modifiedCount > 0;
      } catch (error) {
        Logging.error(error);
        return false;
      }
    }

    static async userPutOwnPost(userId: string, postId: string) {
      try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");
        
        const filter = { _id: new mongoose.Types.ObjectId(userId)};

        const update = {
          $push: {
            ownPostIds: postId,
          }
        }
        
        const result: UpdateResult = await userCollection.updateOne(filter, update);
        Logging.info("User own posts successfully updated");

        return result.modifiedCount > 0;
      } catch (error) {
        Logging.error(error);
        return false;
      }
    }

    static async userDeleteFavorite(userId: string, postId: string) {
      try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");
        
        const filter = { _id: new mongoose.Types.ObjectId(userId)};

        const update = {
          $pull: {
            favoritePostIds: postId,
          }
        }
        
        const result: UpdateResult = await userCollection.updateOne(filter, update);
        Logging.info("User favorites successfully updated");

        return result.modifiedCount > 0;
      } catch (error) {
        Logging.error(error);
        return false;
      }
    }

    static async userDeletOwnPosts(userId: string, postId: string) {
      try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");
        
        const filter = { _id: new mongoose.Types.ObjectId(userId)};

        const update = {
          $pull: {
            ownPostIds: postId,
          }
        }
        
        const result: UpdateResult = await userCollection.updateOne(filter, update);
        Logging.info("User own posts successfully updated");

        return result.modifiedCount > 0;
      } catch (error) {
        Logging.error(error);
        return false;
      }
    }

    static async updateProfilePhoto(userId: string, imageUrl: string) {
      try {
        const db = mongoose.connection.db;
        const userCollection = db.collection("user");
        
        const filter = { _id: new mongoose.Types.ObjectId(userId)};

        const update = {
          $set: {
            profilePhoto: imageUrl,
          }
        }
        
        const result: UpdateResult = await userCollection.updateOne(filter, update);
        Logging.info("User profile photo successfully updated");

        return result.modifiedCount > 0;
      } catch (error) {
        Logging.error(error);
        return false;
      }
    }
}