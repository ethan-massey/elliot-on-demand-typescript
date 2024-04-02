import mongoose from "mongoose";
import "dotenv/config";

const ELLIOT_DATABASE_NAME_UNDEFINED = "ELLIOT_DATABASE_NAME_UNDEFINED";

export const openMongoDBConnection = async () => {
  const mongoURI =
    process.env.MONGO_URI === undefined
      ? ELLIOT_DATABASE_NAME_UNDEFINED
      : process.env.MONGO_URI

  if (mongoURI === ELLIOT_DATABASE_NAME_UNDEFINED) {
    console.error("process.env.MONGO_URI is undefined");
    throw new Error("process.env.MONGO_URI is undefined");
  }

  await mongoose.connect(mongoURI).then(() => {console.log(`Connected to MongoDB!`)}).catch((error) => {
    console.error(error);
    throw new Error(error);
  });
};

export const closeMongoDBConnection = async () => {
  await mongoose.connection
    .close()
    .then(() => {
      console.log("MongoDB connection closed.");
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};
