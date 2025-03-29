import { EpisodeDataGeneratorService } from "../service/EpisodeDataGenerator.Service";
import { Container } from "typedi";
import { RssFileRepository } from "../datasource/repositories/RssFile.Repository";
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

// todo: rss will be served properly, and updated on every episode upload, but rss descriptions won't be updated currently
// todo: need to add that logic after the spotify API call to update rss descriptions
defaultRouter.get("/rss-feed", async (request: any, response: any) => {
  const rssFileRepository = new RssFileRepository();
  const rssString = await rssFileRepository.findOneByVersion("1.0");
  response.set("Content-Type", "application/xml");
  response.send(rssString.fileString);
});
