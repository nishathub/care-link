import { getCollections } from "@/lib/dbCollections";
import { ObjectId } from "mongodb";

// GET single news by ID
export async function GET(request, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const { id } = params;
    const { NewsCollection } = await getCollections();

    const item = await NewsCollection.findOne({
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