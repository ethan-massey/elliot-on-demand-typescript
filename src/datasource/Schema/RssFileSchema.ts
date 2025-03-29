import { Schema } from "mongoose";
import { RssFileEntity } from "../../model/RssFile.Entity";

export const RssFileSchema = new Schema<RssFileEntity>({
  _id: { type: String, required: true },
  fileString: { type: String, required: true },
  version: { type: String, required: true },
});
