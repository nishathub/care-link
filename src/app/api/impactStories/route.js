import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  try {
    const { ImpactStoriesCollection } = await getCollections();
    const stories = await ImpactStoriesCollection.find().toArray();

    return Response.json({ success: true, data: stories });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { success: false, message: "Failed to get stories" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await verifyAdmin(); // only admin can post

    const body = await req.json();
    const { ImpactStoriesCollection } = await getCollections();

    const result = await ImpactStoriesCollection.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, message: "Failed to add story" },
      { status: 500 }
    );
  }
}
