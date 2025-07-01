"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import FormTextInput from "@/components/FormInput/FormTextInput";
import FormTextAreaInput from "@/components/FormInput/FormTextAreaInput";
import OverlayLoader from "@/components/FormInput/OverLayLoader";
import FormCheckboxInput from "@/components/FormInput/FormCheckBoxInput";
import FormSelectInput from "@/components/FormInput/FormSelectInput";
import { useParams, useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import axios from "axios";

const UpdateNews = () => {
  const { id: newsId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [initialDataLoading, setInitialDataLoading] = useState(false);
  const user = useUserStore((state) => state?.user);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      setInitialDataLoading(true);
      try {
        const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
        const { data } = await axios.get(
          `${careLinkAPI}/news/${newsId}`
        );
        setInitialData(data.data);
        reset(data.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setInitialDataLoading(false);
      }
    };

    if (newsId) fetchNews();
  }, [newsId, reset]);

  // Submit updated data
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      let imageURL = initialData?.imageLink || "";
      let cloudinaryPublicId = initialData?.cloudinaryPublicId || "";

      // If a new image was selected
      if (imageFile) {
        const uploaded = await uploadImageToCloudinary(
          imageFile,
          "CareLink/news"
        );
        if (!uploaded?.secure_url) {
          alert("Image upload failed");
          setIsSubmitting(false);
          return;
        }

        imageURL = uploaded.secure_url;
        cloudinaryPublicId = uploaded.public_id;
      }

      const finalData = {
        ...data,
        imageLink: imageURL,
        cloudinaryPublicId,
      };

      const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
      const patchRes = await secureAxios(
        "patch",
        `${careLinkAPI}/news/${newsId}`,
        finalData,
        user
      );
      if (patchRes.data.success) {
        alert("News updated successfully!");
        router.push("/admin/manage-news");
      } else {
        alert("No changes detected.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialDataLoading) return <OverlayLoader message="Loading news..." />;
  if (!initialDataLoading && !initialData) return <OverlayLoader message="News Data Loading Failed" />;

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeading heading={"Edit News"} />

      <div className="bg-gray-300 p-6 rounded-md relative">
        {isSubmitting && <OverlayLoader message="Updating..." />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* News Title */}
          <FormTextInput
            label="News Title*"
            name="title"
            placeholder="The upcoming season.."
            register={register}
            required={true}
            errors={errors}
          />

          {/* Image Upload */}
          <label className="form-control w-full">
            <span className="label-text text-gray-800">Upload Image*</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="file-input file-input-bordered w-full bg-white text-gray-800"
            />
          </label>

          {/* Description */}
          <FormTextAreaInput
            label="Description*"
            name="description"
            placeholder="News description..."
            register={register}
            required={true}
            errors={errors}
          />

          {/* Hidden Checkbox*/}
          <FormCheckboxInput
            label="Hide this news"
            name="hidden"
            register={register}
          />

          <div>
            <button
              type="submit"
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0"
              disabled={isSubmitting}
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNews;
