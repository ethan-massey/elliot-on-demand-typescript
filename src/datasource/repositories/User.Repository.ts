import { MongoBaseRepository } from "./MongoBase.Repository";
import { UserEntity } from "../../model/User.Entity";
import { model } from "mongoose";
import { UserSchema } from "../Schema/User.Schema";

export class UserRepository extends MongoBaseRepository<UserEntity> {
  constructor() {
    super(model<UserEntity>("users", UserSchema, "users"));
  }
  public async findOneByUsername(userName: string): Promise<UserEntity> {
    const query = await this.model.findOne({ username: userName }).exec();
    return query.toObject();
  }
}
