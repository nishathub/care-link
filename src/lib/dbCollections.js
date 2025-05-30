import { connectDB, getDB } from "@/lib/mongo";

export const getCollections = async () => {
  await connectDB();
  const db = getDB();

  return {
    ongoingProjectsCollection: db.collection("OngoingProjects"),
    ImpactStoriesCollection: db.collection("ImpactStories"),
    NewsCollection: db.collection("News"),
    AdminCollection: db.collection("Admins"),
  };
};

export const getAdminByEmail = async (email) => {
  const { AdminCollection } = await getCollections();
  const user = await AdminCollection.findOne({ email: email });
  return user;
};
