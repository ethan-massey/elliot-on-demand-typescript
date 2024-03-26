import { SpotifySegment } from "./ElliotDailySpotifyUpload.Entity";

export interface ElliotEpisodeEntity {
  title: string;
  fileName: string;
  segments: SpotifySegment[];
}
