// import { Container, Service } from "typedi";
// import { S3AudioFileRepository } from "../datasource/repositories/S3AudioFile.Repository";
// import { EpisodeRepository } from "../datasource/repositories/Episode.Repository";
//
// @Service()
// export class EpisodePollingService {
//   private s3AudioFileRepository: S3AudioFileRepository;
//   private episodeRepository: EpisodeRepository;
//
//   constructor() {
//     this.s3AudioFileRepository = new S3AudioFileRepository();
//     this.episodeRepository = Container.get(EpisodeRepository);
//   }
//
//   // get all audio we have in s3
//   // get all episodes we have in MongoDB
//   // If there exist any audio files that don't have a corresponding MongoDB
//   // entity, create it
//   public async AddNewEpisodesToMongoDB() {
//     const audioFilesInS3 = await this.s3AudioFileRepository.findAll();
//     const episodesInMongoDB = await this.episodeRepository.findAll();
//
//
//     console.log(audioFilesInS3)
//     console.log(episodesInMongoDB)
//
//     // const fileNames = audioFilesInS3.map(file => {return file.fileName});
//     //
//     // for (const file of audioFilesInS3){
//     //     if (audioFilesInS3.find())
//     // }
//     //
//     //
//     // await this.episodeRepository.createOne()
//
//   }
// }
