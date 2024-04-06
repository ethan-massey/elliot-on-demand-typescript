import { Document, Model } from "mongoose";

export abstract class MongoBaseRepository {
  protected model: Model<any>;

  protected constructor(model: Model<any>) {
    this.model = model;
  }

  public async findAll<Type>(): Promise<Type[]> {
    const query = await this.model.find({}).exec();
    return this.convertDocumentsToObjects(query);
  }

  protected convertDocumentsToObjects(docs: Document[]) {
    return docs.map((item: Document) => {
      return item.toObject();
    });
  }
}
