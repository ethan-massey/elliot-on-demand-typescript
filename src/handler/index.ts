import { EpisodeDataGeneratorService } from "../service/EpisodeDataGenerator.Service";
import { Container } from "typedi";
const express = require("express");
const xml = require("xml");
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

defaultRouter.get("/rss-feed", async (request: any, response: any) => {
  const data = {
    rss: [
      { _attr: { version: "2.0" } },
      {
        channel: [
          { title: ["Elliot on Demand"] },
          { link: ["https://www.eitmondemand.com/rss-feed"] },
          { description: [""] },
          { item: [{ title: ['Fri Mar 28 2025'] }, { link: ['https://www.eitmondemand.com/?episode=2025-03-28T05:45:00.mp3'] }, { description: ['EITM: Katie Pumphrey 3/28/25 | swimkatie.com, EITM: Bride\'s Two Dads 3/28/25 | When it comes to wedding traditions, bio or step?, EITM: Raising Canines 3/28/25 | Puppy parents and their future service dogs.'] }] },
        ],
      },
    ],
  };
  const xmlString = xml(data);
  response.set("Content-Type", "application/xml");
  response.send(xmlString);
});
