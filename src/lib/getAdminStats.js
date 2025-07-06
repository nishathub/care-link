import { getCollections } from "@/lib/dbCollections";

export const getAdminStats = async () => {
  try {
    const {
      ongoingProjectsCollection,
      ImpactStoriesCollection,
      NewsCollection,
      UsersCollection,
      DonationPackages,
      DonationLogs,
    } = await getCollections();

    const approvedProjects = await ongoingProjectsCollection.countDocuments({
      approved: true,
    });
    const pendingProjects = await ongoingProjectsCollection.countDocuments({
      approved: "pending",
    });
    const totalStories = await ImpactStoriesCollection.estimatedDocumentCount();
    const totalNews = await NewsCollection.estimatedDocumentCount();
    const totalPackages = await DonationPackages.estimatedDocumentCount();
    const donationLogs = await DonationLogs.find().toArray();
    const approvedVolunteers = await UsersCollection.countDocuments({
      role: "volunteer",
      approved: true,
    });
    const pendingVolunteers = await UsersCollection.countDocuments({
      role: "volunteer",
      approved: "pending",
    });
    const approvedDonors = await UsersCollection.countDocuments({
      role: "donor",
      approved: true,
    });
    const pendingDonors = await UsersCollection.countDocuments({
      role: "donor",
      approved: "pending",
    });

    return {
      approvedProjects,
      totalStories,
      totalNews,
      totalPackages,
      approvedVolunteers,
      approvedDonors,
      pendingDonors,
      pendingProjects,
      pendingVolunteers,
      donationLogs,
    };
  } catch (error) {
    console.error("error getting admin stats", error);
  }
};
