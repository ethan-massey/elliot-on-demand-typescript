import { Service } from "typedi";
import {
  S3Client,
  CreateMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import "dotenv/config";

require("dotenv/config");

@Service()
export class S3Service {
  private CLIENT;
  private S3_BUCKET = "daily-elliot-audio";

  constructor() {
    if (!process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY) {
      throw new Error(
        "process.env.S3_ACCESS_KEY_ID or process.env.S3_SECRET_ACCESS_KEY is not defined.",
      );
    }
    this.CLIENT = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  // Initiate multi-part upload and return UploadId
  public async startMultipartUpload(fileName: string) {
    const command = new CreateMultipartUploadCommand({
      Bucket: this.S3_BUCKET,
      Key: fileName,
      ContentType: "audio/mpeg",
    });

    try {
      const response = await this.CLIENT.send(command);
      console.log(`Initiated multi-part S3 upload for file ${fileName}`)
      return response.UploadId;
    } catch (err) {
      throw err;
    }
  }

  // Upload individual Buffer to S3
  public async uploadChunk(
    fileName: string,
    chunk: Buffer,
    chunkNumber: number,
    UploadId: string | undefined,
  ) {
    const command = new UploadPartCommand({
      Body: chunk,
      Bucket: this.S3_BUCKET,
      Key: fileName,
      PartNumber: chunkNumber,
      UploadId: UploadId,
    });
    try {
      const response = await this.CLIENT.send(command);
      return response.ETag;
    } catch (err) {
      console.error(`Failed to upload chunk ${chunkNumber} to S3`);
      throw err;
    }
  }

  // Notify S3 that all chunks have been uploaded
  public async finishMultiPartUpload(
    fileName: string,
    UploadId: string | undefined,
    Parts: any,
  ) {
    const command = new CompleteMultipartUploadCommand({
      Bucket: this.S3_BUCKET,
      Key: fileName,
      UploadId: UploadId,
      MultipartUpload: {
        Parts: Parts,
      },
    });
    try {
      const response = await this.CLIENT.send(command);
      return response;
    } catch (err) {
      console.error(`Failed to finish multi-part upload.`);
      throw err;
    }
  }
}
