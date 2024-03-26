import mongoose, { connect } from "mongoose";
import "dotenv/config";

const ELLIOT_DATABASE_NAME_UNDEFINED = "ELLIOT_DATABASE_NAME_UNDEFINED";

export const openMongoDBConnection = async (databaseName: string) => {
  const mongoURI =
    process.env.MONGO_URI === undefined
      ? ELLIOT_DATABASE_NAME_UNDEFINED
      : process.env.MONGO_URI.replace("ELLIOT_DATABASE_NAME", databaseName);

  if (mongoURI === ELLIOT_DATABASE_NAME_UNDEFINED) {
    console.error("process.env.MONGO_URI is undefined");
    throw new Error("process.env.MONGO_URI is undefined");
  }

  await connect(mongoURI).catch((error) => {
    console.error(error);
    throw new Error(error);
  });
};

export const closeMongoDBConnection = async () => {
  await mongoose.connection.close().catch((error) => {
    console.error(error);
    throw new Error(error);
  });
};
