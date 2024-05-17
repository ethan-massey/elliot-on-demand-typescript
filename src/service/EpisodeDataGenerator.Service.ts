// import { S3AudioFileRepository } from "../datasource/repositories/S3AudioFile.Repository";
// import { SpotifyUploadRepository } from "../datasource/repositories/SpotifyUpload.Repository";
// import { Service } from "typedi";
// import { S3AudioFileEntity } from "../model/S3AudioFile.Entity";
// import { SpotifyUploadEntity } from "../model/SpotifyUpload.Entity";
// import { EpisodeEntity } from "../model/Episode.Entity";
// import mongoose from "mongoose";
//
//
// @Service()
// export class EpisodeDataGeneratorService {
//   private s3AudioFileRepository: S3AudioFileRepository;
//   private elliotDailySpotifyUploadRepository: SpotifyUploadRepository;
//
//   constructor() {
//     this.s3AudioFileRepository = new S3AudioFileRepository();
//     this.elliotDailySpotifyUploadRepository =
//       new SpotifyUploadRepository();
//   }
//
//   public async generateEpisodeData(): Promise<EpisodeEntity[]> {
//     const s3Episodes: S3AudioFileEntity[] =
//       await this.s3AudioFileRepository.findAll();
//     const spotifySegments: SpotifyUploadEntity[] =
//       await this.elliotDailySpotifyUploadRepository.findAll();
//
//     return this.mergeAndFormatData(s3Episodes, spotifySegments);
//   }
//
//   private mergeAndFormatData(
//     s3Episodes: S3AudioFileEntity[],
//     spotifySegments: SpotifyUploadEntity[],
//   ) {
//     const spotifySegmentsGroupedByDate =
//       this.groupSpotifySegmentsByDate(spotifySegments);
//     let formattedData: EpisodeEntity[] = [];
//     s3Episodes.forEach((ep) => {
//       formattedData.push({
//         _id: new mongoose.mongo.ObjectId();
//         title: this.formattedDateFromS3FileName(ep.fileName),
//         fileName: ep.fileName,
//         segments:
//           spotifySegmentsGroupedByDate[ep.fileName.substring(0, 10)] !==
//           undefined
//             ? spotifySegmentsGroupedByDate[ep.fileName.substring(0, 10)]
//                 .segments
//             : [],
//       });
//     });
//
//     formattedData.sort().reverse();
//
//     return formattedData;
//   }
//
//   private groupSpotifySegmentsByDate(
//     spotifySegments: SpotifyUploadEntity[],
//   ) {
//     let ret: any = {};
//     spotifySegments.forEach((upload) => {
//       ret[upload.date] = {
//         segments: upload.segments.sort().reverse(),
//       };
//     });
//     return ret;
//   }
//
//   private formattedDateFromS3FileName = (s3FileName: string) => {
//     return new Date(
//       `${s3FileName.substring(0, s3FileName.length - 13)} EST`,
//     ).toDateString();
//   };
// }
