import { EpisodeDataGeneratorService } from "../service/EpisodeDataGenerator.Service";
import { Container } from "typedi";
const express = require("express");
export const defaultRouter = express.Router();

defaultRouter.get("/", async (request: any, response: any) => {
  const episodeDataGeneratorService = Container.get(
    EpisodeDataGeneratorService,
  );
  const episodes = await episodeDataGeneratorService.generateEpisodeData();
  // If there is an episode in query params
  // ex. http://localhost:5000/?episode=2023-06-05T05-45-17.wav
  let episodeQueued;
  if (request.query.episode) {
    episodeQueued = episodes.find(
      ({ fileName }) => fileName === request.query.episode,
    );
  }

  response.render("index", {
    episodes,
    episodeQueued,
  });
});
