import { getCollections } from "@/lib/dbCollections";
import { ObjectId } from "mongodb";

// GET single donate package by ID
export async function GET(request, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const { id } = params;
    const { DonationPackages } = await getCollections();

    const item = await DonationPackages.findOne({
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