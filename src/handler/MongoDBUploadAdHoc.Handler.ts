import {MongoDBUploadService} from "../service/MongoDBUpload.Service";
import {Container} from "typedi";

const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const mongoDBUploadService: MongoDBUploadService = Container.get(MongoDBUploadService)
export const adHocMongoUpdate = express.Router();

const isValidAPIKey = async (clientPlaintextPassword: string) => {
  // get hashed password from DB
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db("users");
    const passwordCollection = database.collection("passwords");

    const queryResult = await passwordCollection.findOne({
      username: "admin",
    });

    await client.close();

    // check to see if plaintext sent from client matches password in DB
    return bcrypt.compareSync(
      clientPlaintextPassword,
      queryResult.password,
      function (err: any, result: any) {
        if (err) throw err;
      },
    );
  } catch (error) {
    throw error;
  }
};

// endpoint requires API-Key in headers
adHocMongoUpdate.route("/updateEpisodeData").post(async (request: any, response: any) => {
  try {
    if (request.header("API-Key")) {
      if (await isValidAPIKey(request.header("API-Key"))) {
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
