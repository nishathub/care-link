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
import FormDynamicFieldList from "@/components/FormInput/FormDynamicFieldList";
import { useParams } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import axios from "axios";

const UpdateImpactStory = () => {
  const { id: storyId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [initialDataLoading, setInitialDataLoading] = useState(false);
  const user = useUserStore((state) => state?.user);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch story data
  useEffect(() => {
    const fetchStory = async () => {
      setInitialDataLoading(true);
      try {
        const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
        const { data } = await axios.get(
          `${careLinkAPI}/impactStories/${storyId}`
        );
        setInitialData(data.data);
        reset(data.data);
      } catch (err) {
        console.error("Failed to fetch story:", err);
      } finally {
        setInitialDataLoading(false);
      }
    };

    if (storyId) fetchStory();
  }, [storyId, reset]);

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
          "CareLink/impactStories"
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
        `${careLinkAPI}/impactStories/${storyId}`,
        finalData,
        user
      );
      if (patchRes.data.success) {
        alert("Story updated successfully!");
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

  if (initialDataLoading) return <OverlayLoader message="Loading story..." />;
  if (!initialDataLoading && !initialData) return <OverlayLoader message="Story Data Loading Failed" />;

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeading heading={"Edit Project"} />

      <div className="bg-gray-300 p-6 rounded-md relative">
        {isSubmitting && <OverlayLoader message="Updating..." />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormTextInput
            label="Story Title*"
            name="title"
            placeholder="Water for all.."
            register={register}
            required={true}
            errors={errors}
          />

          <label className="form-control w-full">
            <span className="label-text text-gray-800">
              Upload New Image (optional)
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="file-input file-input-bordered w-full bg-white text-gray-800"
            />
          </label>

          <FormTextInput
            label="Related Quote"
            name="relatedQuote"
            placeholder="A motivational quote.."
            register={register}
            required={false}
            errors={errors}
          />

          <FormTextAreaInput
            label="Description*"
            name="description"
            placeholder="Story description..."
            register={register}
            required={true}
            errors={errors}
          />

          <FormSelectInput
            label="Tag*"
            name="tag"
            register={register}
            required={true}
            errors={errors}
            options={[
              "Livelihood",
              "Education",
              "Health",
              "Shelter",
              "Emergency",
            ]}
          />

          <FormCheckboxInput
            label="Hide this project"
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

export default UpdateImpactStory;
