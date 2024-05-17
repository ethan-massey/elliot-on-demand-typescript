import { Schema } from "mongoose";
import { SpotifyUploadEntity } from "../../model/SpotifyUpload.Entity";
import { SpotifySegmentSchema } from "./SpotifySegment.Schema";

export const SpotifyUploadSchema = new Schema<SpotifyUploadEntity>(
  {
    _id: { type: String, required: true },
    date: { type: String, required: true },
    segments: [SpotifySegmentSchema],
  },
  { versionKey: false },
);
