import { Schema } from "mongoose";
import {
  ElliotDailySpotifyUploadEntity,
  SpotifySegment,
} from "../../model/ElliotDailySpotifyUpload.Entity";

const SpotifySegmentSchema = new Schema<SpotifySegment>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

export const ElliotDailySpotifyUploadSchema =
  new Schema<ElliotDailySpotifyUploadEntity>({
    _id: { type: String, required: true },
    date: { type: String, required: true },
    segments: [SpotifySegmentSchema],
  });
