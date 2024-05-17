import { Container, Service } from "typedi";
import { SpotifyRetrievalService } from "./SpotifyRetrieval.Service";
import { SpotifyUploadRepository } from "../datasource/repositories/SpotifyUpload.Repository";
const cron = require("node-cron");

@Service()
export class MongoDBUploadService {
  private spotifyRetrievalService: SpotifyRetrievalService;
  private elliotDailySpotifyUploadRepository: SpotifyUploadRepository;
  constructor() {
    this.spotifyRetrievalService = Container.get(SpotifyRetrievalService);
    this.elliotDailySpotifyUploadRepository = new SpotifyUploadRepository();
  }

  public async uploadNewElliotSegmentsToMongoDB() {
    const segmentsByDate =
      await this.spotifyRetrievalService.getSegmentsByDateFromSpotify();

    for (let segmentByDate of segmentsByDate) {
      let res = await this.elliotDailySpotifyUploadRepository.updateOneByDate(
        segmentByDate.date,
        segmentByDate.segment,
      );
      console.log(
        `${res.matchedCount} document(s) matched the filter ${segmentByDate.date}, updating document`,
      );
    }

    console.log("Documents uploaded!");
  }

  // cron job to regularly update episode segments in MongoDB
  public initSegmentUploadCronJob() {
    const cronSchedule = "0 17 * * *";
    // update episodes once a day, every day
    const updateEpisodeSegments = cron.schedule(cronSchedule, () => {
      this.uploadNewElliotSegmentsToMongoDB().catch(console.dir);
    });

    updateEpisodeSegments.start();
    console.log(
      `MongoDB upload cron job initialized for schedule: ${cronSchedule}`,
    );
  }
}
