import { MongoDBEntity } from "./MongoDB.Entity";

export interface ElliotDailySpotifyUploadEntity extends MongoDBEntity {
  date: string;
  segments: SpotifySegment[];
}

export interface SpotifySegment {
  title: string;
  description: string;
}
