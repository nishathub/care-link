import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { verifyChief } from "@/lib/verifyChief";
import deleteImageFromCloudinary from "@/utils/deleteImageFromCloudinary";
import { sendApprovalMail } from "@/utils/sendMail";
import { ObjectId } from "mongodb";

// UPDATE a single user by ID
export async function PATCH(request, { params: paramsPromise }) {
  try {
    await verifyAdmin(); // only admin can edit

    const params = await paramsPromise;
    const { id } = params;
    const updatedData = await request.json();
    const { UsersCollection } = await getCollections();
    const user = await UsersCollection.findOne({ _id: new ObjectId(id) });
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
    if (user?.approved !== true && updatedData.approved === true) {
      try {
        await sendApprovalMail({
          recipientMail: user?.email,
          name: user?.name,
        });
      } catch (error) {
        console.error("failed to send approved mail")
      }
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

// DELETE a single user by ID
export async function DELETE(request, { params: paramsPromise }) {
  try {
    await verifyChief(); // only chief can run this operation

    const { UsersCollection } = await getCollections();
    const params = await paramsPromise;
    const { id } = params;
    // DELETE IMAGE FROM CLOUDINARY
    const { cloudinaryPublicId, role, rank } = await UsersCollection.findOne({
      _id: new ObjectId(id),
    });
    // PROTECT THE CHIEF FROM ACCIDENTALLY GET DELETED
    if (role === "admin" && rank === "chief") {
      return Response.json(
        { success: false, message: "Delete Failed" },
        { status: 403 }
      );
    }
    if (cloudinaryPublicId) {
      await deleteImageFromCloudinary(cloudinaryPublicId);
    }
    // DELETE ITEM FROM DB even if the Image is not deleted
    const result = await UsersCollection.deleteOne({
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
