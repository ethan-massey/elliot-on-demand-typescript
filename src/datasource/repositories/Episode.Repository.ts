import { MongoBaseRepository } from "./MongoBase.Repository";
import { model } from "mongoose";
import { EpisodeEntity } from "../../model/Episode.Entity";
import { EpisodeSchema } from "../Schema/Episode.Schema";

export class EpisodeRepository extends MongoBaseRepository<EpisodeEntity> {
  constructor() {
    super(model<EpisodeEntity>("episodes", EpisodeSchema, "episodes"));
  }

  public async findByDate(date: string): Promise<EpisodeEntity[]> {
    const query = await this.model.find({ date: date }).exec();
    return query.map((item) => {
      return item.toObject();
    });
  }
}
