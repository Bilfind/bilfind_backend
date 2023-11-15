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
            Logging.info("User is retrieved by id {}", id);
        
            return user;
          } catch (error) {
            Logging.error(error);
            return null;
          }
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        try {
            const db = mongoose.connection.db;
            const userCollection = db.collection("user");
    
            const data = await userCollection.findOne({email})
    
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
                latestStatus: UserStatus.WAITING
            }
            
            const result = await userCollection.insertOne(user);
            Logging.info("User successfully created by id: ", result.insertedId._id.toString())

            return result.insertedId._id;
          } catch (error) {
            Logging.error(error);
            return null;
          }
    }
}