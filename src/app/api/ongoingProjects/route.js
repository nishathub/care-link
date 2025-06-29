import { getCollections } from "@/lib/dbCollections";
import { getOngoingProjects } from "@/lib/getOngoingProjects";
import { verifyOperator } from "@/lib/verifyOperator";

export async function GET() {
  try {
    const projects = await getOngoingProjects();
    return Response.json({ success: true, data: projects });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { success: false, message: "Failed to get project" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await verifyOperator(); // only admin and volunteer can post

    const body = await req.json();
    const { ongoingProjectsCollection } = await getCollections();

    const result = await ongoingProjectsCollection.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, message: "Failed to add story" },
      { status: 500 }
    );
  }
}
