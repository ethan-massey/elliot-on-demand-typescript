import { Schema } from "mongoose";
import { SpotifySegmentSchema } from "./SpotifySegment.Schema";
import { EpisodeEntity } from "../../model/Episode.Entity";

export const EpisodeSchema = new Schema<EpisodeEntity>(
  {
    _id: { type: String, required: true },
    date: { type: String, required: true },
    segments: [SpotifySegmentSchema],
    fileName: { type: String, required: true },
  },
  { versionKey: false },
);
