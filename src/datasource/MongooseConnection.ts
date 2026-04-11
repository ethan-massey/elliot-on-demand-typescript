import mongoose from "mongoose";
import "dotenv/config";


export const openMongoDBConnection = async () => {
  if (process.env.MONGO_URI === undefined) {
    console.error("process.env.MONGO_URI is undefined");
    throw new Error("process.env.MONGO_URI is undefined");
  }

  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Connected to MongoDB!`);
    })
    .catch((error) => {
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
