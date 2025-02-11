import "reflect-metadata";
const express = require("express");
const app = express();
import { defaultRouter } from "./handler";
import { humanReadableTimeRouter } from "./handler/humanReadableTime.Handler";
import { Container } from "typedi";
import { MongoDBUploadService } from "./service/MongoDBUpload.Service";
import {
  closeMongoDBConnection,
  openMongoDBConnection,
} from "./datasource/MongooseConnection";
import { adHocMongoUpdate } from "./handler/MongoDBUploadAdHoc.Handler";
import {RecordingService} from "./service/Recording.Service";
app.set("views", "./src/view");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", defaultRouter);
app.use("/", humanReadableTimeRouter);
app.use("/", adHocMongoUpdate);

openMongoDBConnection().catch(console.dir);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `App is listening on port ${process.env.PORT ? process.env.PORT : 5000}`,
  );
});

// Initiate cron job to update MongoDB with any new EITM spotify episodes
const mongoDBUploadService = Container.get(MongoDBUploadService);
mongoDBUploadService.initSegmentUploadCronJob();
const recordingService: RecordingService  = Container.get(RecordingService);
recordingService.initRecordEpisodeCronJob();

process.on("SIGINT", function () {
  closeMongoDBConnection().then(() => {
    process.exit(0);
  });
});
