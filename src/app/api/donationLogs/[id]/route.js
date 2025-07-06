import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { verifyChief } from "@/lib/verifyChief";
import deleteImageFromCloudinary from "@/utils/deleteImageFromCloudinary";
import { ObjectId } from "mongodb";

// UPDATE a single log by ID
export async function PATCH(request, { params: paramsPromise }) {
  try {
    await verifyAdmin(); // only admin can edit
    
    const params = await paramsPromise;
    const { id } = params;
    const updatedData = await request.json();
    const { DonationLogs } = await getCollections();

    const result = await DonationLogs.updateOne(
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

// DELETE a single log by ID
export async function DELETE(request, { params: paramsPromise }) {
  try {
    await verifyChief(); // only chief can run this operation

    const { DonationLogs } = await getCollections();
    const params = await paramsPromise;
    const { id } = params;
    // DELETE ITEM FROM DB
    const result = await DonationLogs.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return Response.json(
        { success: false, message: "Delete failed" },
        { status: 400 }
      );
    }

    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return Response.json(
      { success: false, message: "Failed to delete" },
      { status: 500 }
    );
  }
}