import axios from "axios";

const uploadImageToCloudinary = async (imageFile, folder = "CareLink") => {
  if (!imageFile) return { secure_url: null, public_id: null };

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("folder", folder);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const res = await axios.post(cloudinaryURL, formData);
    if (res.status === 200 && res.data.secure_url && res.data.public_id) {
      return {
        secure_url: res.data.secure_url,
        public_id: res.data.public_id,
      };
    } else {
      console.error("Cloudinary response error:", res.data);
      return { secure_url: null, public_id: null };
    }
  } catch (err) {
    console.error("Image upload error:", err);
    return { secure_url: null, public_id: null };
  }
};

export default uploadImageToCloudinary;