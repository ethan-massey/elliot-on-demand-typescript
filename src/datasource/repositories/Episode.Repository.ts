import { MongoBaseRepository } from "./MongoBase.Repository";
import { model } from "mongoose";
import { EpisodeEntity } from "../../model/Episode.Entity";
import { EpisodeSchema } from "../Schema/Episode.Schema";

export class EpisodeRepository extends MongoBaseRepository<EpisodeEntity> {
  constructor() {
    super(model<EpisodeEntity>("episodes", EpisodeSchema, "episodes"));
  }
}
