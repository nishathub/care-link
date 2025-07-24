"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { CustomAlert } from "@/utils/handleCustomAlert";

const UpdateImpactStory = () => {
  const { id: storyId } = useParams();
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
          CustomAlert({
            alertText: "Image upload failed",
            alertType: "error",
            duration: 2000,
          });
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
        lastEditedBy: user?.name,
      };

      const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
      const patchRes = await secureAxios(
        "patch",
        `${careLinkAPI}/impactStories/${storyId}`,
        finalData,
        user
      );
      if (patchRes.data.success) {
        CustomAlert({
          alertText: "Story updated !",
          alertType: "succeed",
        });
        router.push("/admin/manage-stories");
      } else {
        CustomAlert({
          alertText: "No changes detected !",
          alertType: "error",
          duration: 2000,
        });
      }
    } catch (err) {
      console.error("Update failed:", err);
      CustomAlert({
        alertText: "Update failed.",
        alertType: "error",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialDataLoading) return <OverlayLoader message="Loading story..." />;
  if (!initialDataLoading && !initialData)
    return <OverlayLoader message="Story Data Loading Failed" />;

  return (
    <div className="max-w-4xl mx-auto">
       <div className="bg-gray-300 rounded-lg shadow-2xl p-4 md:p-6 relative">
        {isSubmitting && <OverlayLoader message="Submitting..." />}

        <h2 className="text-xl md:text-3xl font-semibold text-center capitalize text-gray-900 mb-6">
          Edit Story
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Story Title */}
            <FormTextInput
              label="Story Title*"
              name="title"
              placeholder="Write a concise title.."
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Related Quote */}
            <FormTextInput
              label="Related Quote"
              name="relatedQuote"
              placeholder="A motivational quote.."
              register={register}
              required={false}
              errors={errors}
            />
            {/* Tag */}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Introduction */}
            <FormTextAreaInput
              label="Introduction*"
              name="introduction"
              placeholder="Story introduction..."
              register={register}
              required={true}
              errors={errors}
            />
            {/* Challenge Part */}
            <FormTextAreaInput
              label="Challenge Part*"
              name="challenge"
              placeholder="Write about the problem/challenge shortly..."
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Contribution */}
            <FormTextAreaInput
              label="Contribution*"
              name="contribution"
              placeholder="How we solved the situation..."
              register={register}
              required={true}
              errors={errors}
            />
            {/* Description */}
            <FormTextAreaInput
              label="Description*"
              name="description"
              placeholder="Story description..."
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          {/* Conclusion */}
          <FormTextAreaInput
            label="Conclusion*"
            name="conclusion"
            placeholder="Story conclusion..."
            register={register}
            required={true}
            errors={errors}
          />

          {/* Hidden Checkbox*/}
          <FormCheckboxInput
            label="Hide this story"
            name="hidden"
            register={register}
          />

          <div>
            <button
              type="submit"
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0 w-full"
              disabled={isSubmitting}
            >
              Update Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateImpactStory;
