/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI as string;
const mongodbName = process.env.MONGODB_NAME as string;

if (!mongodbUri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

if (!mongodbName) {
  throw new Error("MONGODB_NAME is not defined in environment variables");
}

// 👇 global caching
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export default async function DbConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongodbUri, {
        dbName: mongodbName,
      })
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}