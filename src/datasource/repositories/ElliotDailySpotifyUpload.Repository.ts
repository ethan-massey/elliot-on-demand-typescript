import {Document, model} from "mongoose";
import {openMongoDBConnection} from "../MongooseConnection";
import {ElliotDailySpotifyUploadSchema} from "../Schema/ElliotDailySpotifyUploadSchema";
import {ElliotDailySpotifyUploadEntity, SpotifySegment,} from "../../model/ElliotDailySpotifyUpload.Entity";

export class ElliotDailySpotifyUploadRepository {
  private readonly DATABASE_NAME: string;
  private elliotDailySpotifyUploadModel;

  constructor() {
    this.DATABASE_NAME = "spotifyDB";
    openMongoDBConnection(this.DATABASE_NAME)
      .then(() => {
        console.log(`Connected to MongoDB database ${this.DATABASE_NAME}!`);
      })
      .catch(console.dir);
    this.elliotDailySpotifyUploadModel = model<ElliotDailySpotifyUploadEntity>(
      "spotifySegments",
      ElliotDailySpotifyUploadSchema,
      "spotifySegments",
    );
  }

  public async findByDate(
    date: string,
  ): Promise<ElliotDailySpotifyUploadEntity[]> {
    const query = await this.elliotDailySpotifyUploadModel
      .find({ date: date })
      .exec();
    return this.convertDocumentsToObjects(query);
  }

  public async findAll(): Promise<ElliotDailySpotifyUploadEntity[]> {
    const query = await this.elliotDailySpotifyUploadModel.find({}).exec();
    return this.convertDocumentsToObjects(query);
  }

  public async updateOneByDate(date: string, segment: SpotifySegment) {
    return await this.elliotDailySpotifyUploadModel
        .updateOne(
            {date: date},
            {
              $addToSet: {segments: segment},
            },
            {upsert: true},
        )
        .exec();
  }

  private convertDocumentsToObjects(docs: Document[]) {
    return docs.map((item: Document) => {
      return item.toObject();
    });
  }
}
