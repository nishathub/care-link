import { getCollections } from "@/lib/dbCollections";

export async function GET() {
  try {
    const {
      ongoingProjectsCollection,
      ImpactStoriesCollection,
      NewsCollection,
      UsersCollection,
      DonationPackages,
    } = await getCollections();

    const totalProjects =
      await ongoingProjectsCollection.estimatedDocumentCount();
    const totalStories = await ImpactStoriesCollection.estimatedDocumentCount();
    const totalNews = await NewsCollection.estimatedDocumentCount();
    const totalPackages = await DonationPackages.estimatedDocumentCount();
    const totalVolunteers = await UsersCollection.countDocuments({
      role: "volunteer", approved: true,
    });
    const totalDonors = await UsersCollection.countDocuments({ role: "donor",  approved: true });

    return Response.json({
      success: true,
      data: {
        totalProjects,
        totalStories,
        totalNews,
        totalPackages,
        totalVolunteers,
        totalDonors,
      },
    });
  } catch (error) {}
}
