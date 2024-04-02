import { Document, Model } from "mongoose";

export abstract class MongoBaseRepository {
  protected model: Model<any>;

  protected constructor(model: Model<any>) {
    this.model = model;
  }

  protected convertDocumentsToObjects(docs: Document[]) {
    return docs.map((item: Document) => {
      return item.toObject();
    });
  }
}
