import { model, Document } from "mongoose";
import {
  closeMongoDBConnection,
  openMongoDBConnection,
} from "../MongooseConnection";
import { ElliotDailySpotifyUploadSchema } from "../Schema/ElliotDailySpotifyUploadSchema";
import { ElliotDailySpotifyUploadEntity } from "../../model/ElliotDailySpotifyUpload.Entity";

export class ElliotDailySpotifyUploadRepository {
  private readonly DATABASE_NAME: string;
  private model;

  constructor() {
    this.model = model<ElliotDailySpotifyUploadEntity>(
      "spotifySegments",
      ElliotDailySpotifyUploadSchema,
      "spotifySegments",
    );
    this.DATABASE_NAME = "spotifyDB";
  }

  public async findByDate(
    date: string,
  ): Promise<ElliotDailySpotifyUploadEntity[]> {
    await openMongoDBConnection(this.DATABASE_NAME);
    const query = await this.model.find({ date: date }).exec();
    await closeMongoDBConnection();
    return this.convertDocumentsToObjects(query);
  }

  public async findAll(): Promise<ElliotDailySpotifyUploadEntity[]> {
    await openMongoDBConnection(this.DATABASE_NAME);
    const query = await this.model.find({}).exec();
    await closeMongoDBConnection();
    return this.convertDocumentsToObjects(query);
  }

  private convertDocumentsToObjects(docs: Document[]) {
    return docs.map((item: Document) => {
      return item.toObject();
    });
  }
}
