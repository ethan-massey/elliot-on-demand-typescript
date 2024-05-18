import { Document, Model } from "mongoose";
import { MongoDBEntity } from "../../model/MongoDB.Entity";

export abstract class MongoBaseRepository<Type extends MongoDBEntity> {
  protected model: Model<any>;

  protected constructor(model: Model<any>) {
    this.model = model;
  }

  public async findAll(): Promise<Type[]> {
    const query = await this.model.find({}).exec();
    return this.convertDocumentsToObjects(query);
  }

  public async createOne(object: Type) {
    return await this.model.create(object);
  }

  protected convertDocumentsToObjects(docs: Document[]): Type[] {
    return docs.map((item: Document) => {
      return item.toObject();
    });
  }
}
