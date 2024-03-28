import { S3AudioFileRepository } from "../datasource/repositories/S3AudioFile.Repository";
import { ElliotDailySpotifyUploadRepository } from "../datasource/repositories/ElliotDailySpotifyUpload.Repository";
import { Service } from "typedi";
import { S3AudioFileEntity } from "../model/S3AudioFile.Entity";
import { ElliotDailySpotifyUploadEntity } from "../model/ElliotDailySpotifyUpload.Entity";
import { ElliotEpisodeEntity } from "../model/ElliotEpisode.Entity";

@Service()
export class EpisodeDataGeneratorService {
  private s3AudioFileRepository: S3AudioFileRepository;
  private elliotDailySpotifyUploadRepository: ElliotDailySpotifyUploadRepository;

  constructor() {
    this.s3AudioFileRepository = new S3AudioFileRepository();
    this.elliotDailySpotifyUploadRepository =
      new ElliotDailySpotifyUploadRepository();
  }

  public async generateEpisodeData(): Promise<ElliotEpisodeEntity[]> {
    const s3Episodes: S3AudioFileEntity[] =
      await this.s3AudioFileRepository.findAll();
    const spotifySegments: ElliotDailySpotifyUploadEntity[] =
      await this.elliotDailySpotifyUploadRepository.findAll();

    return this.mergeAndFormatData(s3Episodes, spotifySegments);
  }

  private mergeAndFormatData(
    s3Episodes: S3AudioFileEntity[],
    spotifySegments: ElliotDailySpotifyUploadEntity[],
  ) {
    const spotifySegmentsGroupedByDate =
      this.groupSpotifySegmentsByDate(spotifySegments);
    let formattedData: ElliotEpisodeEntity[] = [];
    s3Episodes.forEach((ep) => {
      formattedData.push({
        title: this.formattedDateFromS3FileName(ep.fileName),
        fileName: ep.fileName,
        segments:
          spotifySegmentsGroupedByDate[ep.fileName.substring(0, 10)] !==
          undefined
            ? spotifySegmentsGroupedByDate[ep.fileName.substring(0, 10)]
                .segments
            : [],
      });
    });

    formattedData.sort().reverse();

    return formattedData;
  }

  private groupSpotifySegmentsByDate(
    spotifySegments: ElliotDailySpotifyUploadEntity[],
  ) {
    let ret: any = {};
    spotifySegments.forEach((upload) => {
      ret[upload.date] = {
        segments: upload.segments.sort().reverse(),
      };
    });
    return ret;
  }

  private formattedDateFromS3FileName = (s3FileName: string) => {
    return new Date(
      `${s3FileName.substring(0, s3FileName.length - 13)} EST`,
    ).toDateString();
  };
}
