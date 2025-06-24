import { ObjectId } from "mongodb";
import { getCollections } from "@/lib/dbCollections";
import deleteImageFromCloudinary from "@/utils/deleteImageFromCloudinary";
import { verifyChief } from "@/lib/verifyChief";
import { verifyOperator } from "@/lib/verifyOperator";
import { verifyTokenJWT } from "@/lib/verifyToken";

// GET single project by ID
export async function GET(request, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const { id } = params;
    const { ongoingProjectsCollection } = await getCollections();

    const item = await ongoingProjectsCollection.findOne({
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

// UPDATE a single story by ID
export async function PATCH(request, { params: paramsPromise }) {
  try {
    await verifyOperator(); // admin and vol can edit

    const params = await paramsPromise;
    const { id } = params;
    const updatedData = await request.json();

    // Removing _id field from updatedData
    delete updatedData._id;

    // if volunteer, one can edit only the item he posted.
    const user = await verifyTokenJWT();
    if (user?.role === "volunteer") {
      if (user?.name !== updatedData?.author) {
        return Response.json(
          { success: false, message: "Update failed" },
          { status: 400 }
        );
      }
    }

    const { ongoingProjectsCollection } = await getCollections();
    const result = await ongoingProjectsCollection.updateOne(
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

// DELETE a single story by ID
export async function DELETE(request, { params: paramsPromise }) {
  try {
    await verifyChief(); // only chief can run this operation

    const { ongoingProjectsCollection } = await getCollections();
    const params = await paramsPromise;
    const { id } = params;
    // DELETE IMAGE FROM CLOUDINARY
    const { cloudinaryPublicId } = await ongoingProjectsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (cloudinaryPublicId) {
      await deleteImageFromCloudinary(cloudinaryPublicId);
    }
    // DELETE ITEM FROM DB even if the Image is not deleted
    const result = await ongoingProjectsCollection.deleteOne({
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
