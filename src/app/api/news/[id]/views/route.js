import { getCollections } from "@/lib/dbCollections";
import { ObjectId } from "mongodb";

// UPDATE a single news by ID
export async function PATCH(request, { params: paramsPromise }) {
  try {    
    const params = await paramsPromise;
    const { id } = params;
    const updatedData = await request.json();
    const { NewsCollection } = await getCollections();
   
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