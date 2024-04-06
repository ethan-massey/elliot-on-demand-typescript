import { model } from "mongoose";
import {
  ElliotDailySpotifyUploadEntity,
  SpotifySegment,
} from "../../model/ElliotDailySpotifyUpload.Entity";
import { MongoBaseRepository } from "./MongoBase.Repository";
import { ElliotDailySpotifyUploadSchema } from "../Schema/ElliotDailySpotifyUploadSchema";

export class ElliotDailySpotifyUploadRepository extends MongoBaseRepository {
  constructor() {
    super(
      model<ElliotDailySpotifyUploadEntity>(
        "spotifySegments",
        ElliotDailySpotifyUploadSchema,
        "spotifySegments",
      ),
    );
  }

  public async updateOneByDate(date: string, segment: SpotifySegment) {
    return await this.model
      .updateOne(
        { date: date },
        {
          $addToSet: { segments: segment },
        },
        { upsert: true },
      )
      .exec();
  }
}
