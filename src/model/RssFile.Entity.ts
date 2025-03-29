import { MongoDBEntity } from "./MongoDB.Entity";

export interface RssFileEntity extends MongoDBEntity {
  fileString: string;
  version: string;
}
