import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { ObjectId } from "mongodb";

// UPDATE a single user by ID
export async function PATCH(request, { params: paramsPromise }) {
  try {
    await verifyAdmin(); // only admin can edit
    
    const params = await paramsPromise;
    const { id } = params;
    const updatedData = await request.json();
    const { UsersCollection } = await getCollections();
    // Removing _id field from updatedData
    delete updatedData._id;
    
    const result = await UsersCollection.updateOne(
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