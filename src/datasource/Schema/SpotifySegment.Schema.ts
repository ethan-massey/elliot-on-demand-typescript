import { Schema } from "mongoose";
import { SpotifySegment } from "../../model/SpotifyUpload.Entity";

export const SpotifySegmentSchema = new Schema<SpotifySegment>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);
