import { getDB } from "@/lib/mongo";

export const getCollections = async () => {
  const db = await getDB();

  return {
    ongoingProjectsCollection: db.collection("OngoingProjects"),
    ImpactStoriesCollection: db.collection("ImpactStories"),
    NewsCollection: db.collection("News"),
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
