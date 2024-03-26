export interface ElliotDailySpotifyUploadEntity {
  _id: string;
  date: string;
  segments: SpotifySegment[];
}

export interface SpotifySegment {
  title: string;
  description: string;
}
