import mongoose, { Schema } from "mongoose";
import { SpotifySegmentSchema } from "./SpotifySegment.Schema";
import { EpisodeEntity } from "../../model/Episode.Entity";

export const EpisodeSchema = new Schema<EpisodeEntity>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    segments: [SpotifySegmentSchema],
    fileName: { type: String, required: true },
  },
  { versionKey: false },
);
