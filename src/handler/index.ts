import { EpisodeRepository } from "../datasource/repositories/Episode.Repository";
import { EpisodeEntity } from "../model/Episode.Entity";

const express = require("express");
export const defaultRouter = express.Router();

defaultRouter.get("/episodes/:date?", async (request: any, response: any) => {
  try {
    const episodeRepository = new EpisodeRepository();
    let episodes: EpisodeEntity[] = [];

    if (request.params.date) {
      episodes = await episodeRepository.findByDate(request.params.date);
    } else {
      episodes = await episodeRepository.findAll();
    }
    response.status(200).json(episodes);
  } catch (e) {
    console.error(e);
    response.status(500).json({
      message: "Internal server error.",
    });
  }
});
