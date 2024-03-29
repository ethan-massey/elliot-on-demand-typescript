import { model, Document } from "mongoose";
import {
  closeMongoDBConnection,
  openMongoDBConnection,
} from "../MongooseConnection";
import { ElliotDailySpotifyUploadSchema } from "../Schema/ElliotDailySpotifyUploadSchema";
import {
  ElliotDailySpotifyUploadEntity,
  SpotifySegment,
} from "../../model/ElliotDailySpotifyUpload.Entity";

export class ElliotDailySpotifyUploadRepository {
  private readonly DATABASE_NAME: string;
  private elliotDailySpotifyUploadModel;

  constructor() {
    this.elliotDailySpotifyUploadModel = model<ElliotDailySpotifyUploadEntity>(
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
    const query = await this.elliotDailySpotifyUploadModel
      .find({ date: date })
      .exec();
    await closeMongoDBConnection();
    return this.convertDocumentsToObjects(query);
  }

  public async findAll(): Promise<ElliotDailySpotifyUploadEntity[]> {
    await openMongoDBConnection(this.DATABASE_NAME);
    const query = await this.elliotDailySpotifyUploadModel.find({}).exec();
    await closeMongoDBConnection();
    return this.convertDocumentsToObjects(query);
  }

  public async updateOneByDate(date: string, segment: SpotifySegment) {
    await openMongoDBConnection(this.DATABASE_NAME);
    const res = await this.elliotDailySpotifyUploadModel
      .updateOne(
        { date: date },
        {
          $addToSet: { segments: segment },
        },
        { upsert: true },
      )
      .exec();
    await closeMongoDBConnection();
    return res;
  }

  private convertDocumentsToObjects(docs: Document[]) {
    return docs.map((item: Document) => {
      return item.toObject();
    });
  }
}
