import { _Object, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";
import { S3AudioFileEntity } from "../../model/S3AudioFile.Entity";

export class S3AudioFileRepository {
  private client: S3Client;
  private BUCKET_NAME = "daily-elliot-audio";

  constructor() {
    if (
      process.env.S3_ACCESS_KEY_ID === undefined ||
      process.env.S3_SECRET_ACCESS_KEY === undefined
    ) {
      console.error("Error retrieving S3 credential environment variables");
      throw new Error("Error retrieving S3 credential environment variables");
    }

    this.client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  public async findAll(): Promise<S3AudioFileEntity[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.BUCKET_NAME,
    });
    try {
      const response = await this.client.send(command);

      return response.Contents === undefined
        ? []
        : this.convertS3ObjectsToS3Entities(response.Contents);
    } catch (err) {
      throw err;
    }
  }

  private convertS3ObjectsToS3Entities(
    s3Objects: _Object[],
  ): S3AudioFileEntity[] {
    return s3Objects.map((item) => {
      return {
        fileName: item.Key === undefined ? "UNDEFINED" : item.Key,
      };
    });
  }
}
