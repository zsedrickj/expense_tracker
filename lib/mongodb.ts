import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI as string;
const mongodbName = process.env.MONGODB_NAME as string;

if (!mongodbUri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

if (!mongodbName) {
  throw new Error("MONGODB_NAME is not defined in environment variables");
}

export default async function DbConnection() {
  try {
    await mongoose.connect(mongodbUri, {
      dbName: mongodbName,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(
      "Failed to connect to MongoDB: " + (error as Error).message,
    );
  }
}
