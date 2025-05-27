import { getCollections } from "@/lib/dbCollections";

export async function GET() {
  try {
    const { ongoingProjectsCollection } = await getCollections();
    const project = await ongoingProjectsCollection.find().toArray();

    return Response.json({ success: true, data: project });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ success: false, message: "Failed to get project" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { ongoingProjectsCollection } = await getCollections();

    const result = await ongoingProjectsCollection.insertOne(body);
    console.log(result);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ success: false, message: "Failed to add story" }, { status: 500 });
  }
}
