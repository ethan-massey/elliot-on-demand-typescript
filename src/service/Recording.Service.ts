import {Container, Service} from "typedi";

const cron = require("node-cron");
import axios from "axios";
import {getFileNameFromCurrentDateTime} from "../util/formatDate";
import {S3Service} from "./S3.Service";

@Service()
export class RecordingService {
    private S3Service: S3Service;

    constructor() {
        this.S3Service = Container.get(S3Service)
    }

    private async streamEpisodeToS3() {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://stream.revma.ihrhls.com/zc2525',
                responseType: 'stream'
            })

            const fileName = getFileNameFromCurrentDateTime()
            const uploadId = await this.S3Service.startMultipartUpload(fileName)
            const startTime = Date.now();
            let chunkNo = 1
            let parts: any[] = []

            const stream = response.data
            let tempBuffer = Buffer.from([])

            const MIN_CHUNK_SIZE = 1024 * 1024 * 5
            const MIN_RECORDING_LENGTH = 60 * 1000 * 60 * 5.5 // 5.5 hours


            stream.on('data', async (chunk: any) => {
                tempBuffer = Buffer.concat([tempBuffer, chunk])
                // console.log(`current length: ${tempBuffer.length}`)

                // build until buffer is 5MB (minimum for s3 multipart upload)
                if (tempBuffer.length >= MIN_CHUNK_SIZE) {
                    const elapsedTime = Date.now() - startTime
                    stream.pause()
                    //console.log(tempBuffer)

                    let eTag = await this.S3Service.uploadChunk(fileName, tempBuffer, chunkNo, uploadId)
                    parts.push({
                        ETag: eTag,
                        PartNumber: chunkNo
                    })
                    console.log(`uploaded ${tempBuffer.length} bytes of data. (Chunk No. ${chunkNo})`)
                    if (elapsedTime >= MIN_RECORDING_LENGTH) {
                        console.log(`elapsed time: ${elapsedTime}`)
                        // time to finish file upload
                        let res = await this.S3Service.finishMultiPartUpload(fileName, uploadId, parts)
                        console.log('Success uploading file to S3')
                        console.log(res)

                        // end stream
                        stream.destroy()
                    } else {
                        // set buffer back to empty
                        chunkNo += 1
                        tempBuffer = Buffer.from([])
                        stream.resume()
                    }
                }
            })
        } catch (e) {
            console.error(`Error while streaming episode to S3: ${e}`)
        }
    }

    // cron job to regularly update episode segments in MongoDB
    public initRecordEpisodeCronJob() {
        // todo: fix this hard coded time zone stuff
        const cronSchedule = "45 10 * * 1-5"; // 10:45 UTC (5:45 ET)
        // update episodes once a day, every day
        const updateEpisodeSegments = cron.schedule(cronSchedule, () => {
            this.streamEpisodeToS3().catch(console.dir);
        });

        updateEpisodeSegments.start();
        console.log(
            `Episode recorder cron job initialized for schedule: ${cronSchedule}`,
        );
    }
}





