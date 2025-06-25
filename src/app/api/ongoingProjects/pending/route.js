import { getCollections } from "@/lib/dbCollections";

export async function GET() {
  try {
    const { ongoingProjectsCollection } = await getCollections();
    // filter object for pending only
    const filter = {approved : "pending"};
    const project = await ongoingProjectsCollection.find(filter).toArray();

    return Response.json({ success: true, data: project });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { success: false, message: "Failed to get project" },
      { status: 500 }
    );
  }
}