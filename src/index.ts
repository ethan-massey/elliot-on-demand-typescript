import "reflect-metadata";
const express = require("express");
const app = express();
import { defaultRouter } from "./handler";
app.set("views", "./src/view");
app.set("view engine", "ejs");
// import { getFormattedEpisodeData } from './util/formatEpisodeData'
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use("/", defaultRouter);
// app.use(require("./routes/humanReadableTime"))
// app.use(require("./routes/adHocMongoUpdate"))

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `App is listening on port ${process.env.PORT ? process.env.PORT : 5000}`,
  );
});

// Initiate cron job to update MongoDB with any new EITM spotify episodes
// const mongoCronUtil = require('./util/mongoCronUpdate');
// mongoCronUtil.initUpdateEpisodeSegments();
