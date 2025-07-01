import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";
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

// UPDATE a single news by ID
export async function PATCH(request, { params: paramsPromise }) {
  try {
    await verifyAdmin(); // only admin can edit
    
    const params = await paramsPromise;
    const { id } = params;
    const updatedData = await request.json();
    const { NewsCollection } = await getCollections();
    // Removing _id field from updatedData
    delete updatedData._id;
    
    const result = await NewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 0) {
      return Response.json(
        { success: false, message: "Update failed" },
        { status: 400 }
      );
    }

    return Response.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("PATCH error:", error);
    return Response.json(
      { success: false, message: "Failed to update" },
      { status: 500 }
    );
  }
}