import { MongoBaseRepository } from "./MongoBase.Repository";
import { UserEntity } from "../../model/User.Entity";
import { model } from "mongoose";
import { RssFileSchema } from "../Schema/RssFileSchema";
import { RssFileEntity } from "../../model/RssFile.Entity";
const xml2js = require("xml2js");
export class RssFileRepository extends MongoBaseRepository<UserEntity> {
  constructor() {
    super(model<RssFileEntity>("rss", RssFileSchema, "rss"));
  }
  public async findOneByVersion(version: string): Promise<RssFileEntity> {
    const query = await this.model.findOne({ version: version }).exec();
    return query.toObject();
  }

  public async addItemWithTitleAndLink(
    title: string,
    link: string,
    version: string,
  ) {
    try {
      let rssFile: RssFileEntity = await this.findOneByVersion(version);
      let xmlAsJSON: any = await this.parseAsync(rssFile.fileString);
      // add item to json
      xmlAsJSON.rss.channel[0].item.push({
        title: [title],
        link: [link],
        description: [""],
      });
      // convert back to xml
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(xmlAsJSON);
      // save to DB
      await this.model
        .updateOne(
          { version: version },
          {
            $set: { fileString: xml },
          },
          { upsert: true },
        )
        .exec();
    } catch (e) {
      console.error(`Error adding item to RSS feed: ${e}`);
    }
  }

  private parseAsync = (xml: string) => {
    const parser = new xml2js.Parser();

    return new Promise((resolve, reject) => {
      parser.parseString(xml, (err: any, result: any) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
