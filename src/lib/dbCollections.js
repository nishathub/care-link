import { connectDB, getDB } from "@/lib/mongo";

export const getCollections = async () => {
  await connectDB();
  const db = getDB();

  return {
    ongoingProjectsCollection: db.collection("OngoingProjects"),
    ImpactStoriesCollection: db.collection("ImpactStories"),
    NewsCollection: db.collection("News"),
    AdminCollection: db.collection("Admins"),
    UsersCollection: db.collection("Users"),
  };
};

export const getUserByEmail = async (email) => {
  const { UsersCollection } = await getCollections();
  const user = await UsersCollection.findOne({ email: email });
  return user;
};
