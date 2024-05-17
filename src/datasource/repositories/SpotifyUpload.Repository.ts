import { model } from "mongoose";
import {
  SpotifyUploadEntity,
  SpotifySegment,
} from "../../model/SpotifyUpload.Entity";
import { MongoBaseRepository } from "./MongoBase.Repository";
import { SpotifyUploadSchema } from "../Schema/SpotifyUploadSchema";

export class SpotifyUploadRepository extends MongoBaseRepository<SpotifyUploadEntity> {
  constructor() {
    super(
      model<SpotifyUploadEntity>(
        "spotifyUploads",
        SpotifyUploadSchema,
        "spotifyUploads",
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
