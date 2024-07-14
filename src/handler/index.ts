import { EpisodeRepository } from "../datasource/repositories/Episode.Repository";
import { EpisodeEntity } from "../model/Episode.Entity";

const express = require("express");
export const defaultRouter = express.Router();

defaultRouter.get("/episodes", async (request: any, response: any) => {
  try {
    const episodeRepository = new EpisodeRepository();
    let episodes: EpisodeEntity[] = [];

    if (request.query.date) {
      episodes = await episodeRepository.findByDate(request.query.date);
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

defaultRouter.get("/", async (request: any, response: any) => {
  const episodeRepository = new EpisodeRepository();
  const episodes = await episodeRepository.findAll()
  // If there is an episode in query params
  // ex. http://localhost:5000/?episode=2023-06-05T05-45-17.wav
  let episodeQueued;
  // if (request.query.episode) {
  //   episodeQueued = episodes.find(
  //       ({ fileName }) => fileName === request.query.episode,
  //   );
  // }

  response.render("index", {
    episodes,
    episodeQueued,
  });
});
