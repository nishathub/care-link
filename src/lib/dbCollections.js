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
    DonationPackages: db.collection("DonationPackages"),
    DonationLogs: db.collection("DonationLogs"),
  };
};

export const getUserByEmail = async (email) => {
  const { UsersCollection } = await getCollections();
  const user = await UsersCollection.findOne({ email: email });
  return user;
};
export const getAdminByEmail = async (email) => {
  const { AdminCollection } = await getCollections();
  const user = await AdminCollection.findOne({ email: email });
  return user;
};
