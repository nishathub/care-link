import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URL;

// create a global cache to avoid calling mongoDB on every request
let cached = global.mongoClientCache;
if (!cached) {
  cached = global.mongoClientCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      cached.promise = client.connect();
      cached.conn = await cached.promise;

      console.log("Successfully connected to MongoDB")
    } catch (error) {
      console.error("MongoDB connection error");
      cached.promise = null;
      cached.conn = null;
      throw error;
    }
  }
  if(!cached.conn){
    throw new Error("MongoDB connection Failed")
  }
  return cached.conn;
}

export async function getDB() {
  const client = await connectDB();
  if(!client){
    throw new Error("MongoDB client is null")
  }
  return client.db("CareLinkDB");
}
