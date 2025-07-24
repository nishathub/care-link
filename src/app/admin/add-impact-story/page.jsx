"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import FormTextInput from "@/components/FormInput/FormTextInput";
import FormTextAreaInput from "@/components/FormInput/FormTextAreaInput";
import OverlayLoader from "@/components/FormInput/OverLayLoader";
import FormCheckboxInput from "@/components/FormInput/FormCheckBoxInput";
import FormSelectInput from "@/components/FormInput/FormSelectInput";
import useUserStore from "@/lib/zustand/userStore";
import { secureAxios } from "@/utils/secureAxios";
import { useRouter } from "next/navigation";
import { CustomAlert } from "@/utils/handleCustomAlert";

const AddImpactStory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const user = useUserStore((state) => state?.user);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // First we upload the image to cloudinary and get url
      const { secure_url, public_id } = await uploadImageToCloudinary(
        imageFile,
        "CareLink/impactStories"
      );

      // If image upload failed but user selected a file, stop submission
      if (imageFile && !secure_url) {
        setIsSubmitting(false);
        return;
      }

      const finalData = {
        ...data,
        imageLink: secure_url || "",
        cloudinaryPublicId: public_id || "",
        views: 0,
        date: new Date(),
        journalist: "CareLink-Team",
      };

      const postStoryRes = await secureAxios(
        "post",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories`,
        finalData,
        user
      );
      if (postStoryRes.data.insertedId) {
        reset();
        setImageFile(null);
        CustomAlert({
          alertText: "Story added !",
          alertType: "succeed",
        });
        router.push("/admin/manage-stories");
      }
    } catch (error) {
      console.error("Error:", error);
      CustomAlert({
        alertText: "Failed to add story.",
        alertType: "error",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-300 rounded-lg shadow-2xl p-4 md:p-6 relative">
        {isSubmitting && <OverlayLoader message="Submitting..." />}

        <h2 className="text-xl md:text-3xl font-semibold text-center text-gray-900 mb-6">
          Add a new Story
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

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0 w-full"
              disabled={isSubmitting}
            >
              Add Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddImpactStory;
