import { SpotifyUploadEntity } from "./SpotifyUpload.Entity";
import { MongoDBEntity } from "./MongoDB.Entity";
import { S3AudioFileEntity } from "./S3AudioFile.Entity";

export interface EpisodeEntity
  extends MongoDBEntity,
    SpotifyUploadEntity,
    S3AudioFileEntity {
  title: string;
}
