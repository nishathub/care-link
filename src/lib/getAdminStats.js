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
    const pendingDonationLogs = await DonationLogs.countDocuments({
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
      pendingDonationLogs,
    };
  } catch (error) {
    console.error("error getting admin stats", error);
     return {
      approvedProjects: 0,
      totalStories: 0,
      totalNews: 0,
      totalPackages: 0,
      approvedVolunteers: 0,
      approvedDonors: 0,
      pendingDonors: 0,
      pendingProjects: 0,
      pendingVolunteers: 0,
      donationLogs: [],
      pendingDonationLogs: 0,
    };
  }
};
