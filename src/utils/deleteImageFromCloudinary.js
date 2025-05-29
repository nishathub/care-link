import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImageFromCloudinary = async (publicId) => {
  try {
    const cloudRes = await cloudinary.uploader.destroy(publicId);
    return cloudRes;
  } catch (error) {
    console.error("Failed to delete image from cloudinary", error);
  }
};

export default deleteImageFromCloudinary;
