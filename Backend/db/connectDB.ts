import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is not defined");

const client = new MongoClient(uri);

export async function connectDB(): Promise<MongoClient> {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export function getDB(dbName: string = "portfolio") {
  return client.db(dbName);
}
