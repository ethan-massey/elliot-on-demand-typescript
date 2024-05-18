import mongoose, { Schema } from "mongoose";
import { UserEntity } from "../../model/User.Entity";

export const UserSchema = new Schema<UserEntity>({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
