import { MongoDBUploadService } from "../service/MongoDBUpload.Service";
import { Container } from "typedi";
import { ValidationService } from "../service/Validation.Service";

const express = require("express");

const mongoDBUploadService: MongoDBUploadService =
  Container.get(MongoDBUploadService);
const validationService: ValidationService = Container.get(ValidationService);
export const adHocMongoUpdate = express.Router();

// endpoint requires API-Key in headers
adHocMongoUpdate
  .route("/updateEpisodeData")
  .post(async (request: any, response: any) => {
    try {
      if (request.header("API-Key")) {
        if (await validationService.isValidAPIKey(request.header("API-Key"))) {
          await mongoDBUploadService.uploadNewElliotSegmentsToMongoDB();
          response.status(201).send("Database updated.");
        } else {
          response.status(401).send("Client unauthorized.");
        }
      } else {
        response.status(401).send("Header 'API-Key' required.");
      }
    } catch (error) {
      console.error(error);
      response.status(500).send(`Internal Server Error.`);
    }
  });
