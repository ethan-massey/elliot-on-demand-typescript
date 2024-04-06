import { MongoDBEntity } from "./MongoDB.Entity";

export interface UserEntity extends MongoDBEntity {
  username: string;
  password: string;
}
