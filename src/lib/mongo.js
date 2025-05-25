// lib/db.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URL;

let client;

export async function connectDB() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("successfully connected to MongoDB!");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      process.exit(1);
    }
  }
  return client;
}

export function getDB() {
  if (!client) {
    throw new Error("MongoClient Not Initialized");
  }
  return client.db("CareLinkDB"); 
}
