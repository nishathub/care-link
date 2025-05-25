import { connectDB, getDB } from "@/lib/mongo";

export const getCollections = async () => {
  await connectDB();
  const db = getDB();

  return {
    ongoingProjectsCollection: db.collection("OngoingProjects"),
    ImpactStoriesCollection: db.collection("ImpactStories"),
    NewsCollection: db.collection("News"),

  };
};
