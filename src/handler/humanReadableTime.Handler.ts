const express = require("express");
export const humanReadableTimeRouter = express.Router();

humanReadableTimeRouter
  .route("/humanReadableTime/:timeInSeconds")
  .get(async (request: any, response: any) => {
    const inputSeconds = request.params.timeInSeconds;
    const humanizeDuration = require("humanize-duration");
    const shortEnglishHumanizer = humanizeDuration.humanizer({
      language: "shortEn",
      languages: {
        shortEn: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "hr",
          m: () => "min",
          s: () => "sec",
          ms: () => "ms",
        },
      },
    });
    const res = shortEnglishHumanizer(inputSeconds, {
      round: true,
      delimiter: " ",
    });
    response.status(200).json({
      readableTime: res,
    });
  });
