import { ObjectId } from "mongodb";
import { getCollections } from "@/lib/dbCollections";

// GET single story by ID
export async function GET(request, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const { id } = params;
    const { ImpactStoriesCollection } = await getCollections();

    const item = await ImpactStoriesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!item) {
      return Response.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: item });
  } catch (error) {
    console.error("GET single error:", error);
    return Response.json(
      { success: false, message: "Failed to get item" },
      { status: 500 }
    );
  }
}