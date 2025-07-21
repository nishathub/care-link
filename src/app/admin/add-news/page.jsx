"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import FormTextInput from "@/components/FormInput/FormTextInput";
import FormTextAreaInput from "@/components/FormInput/FormTextAreaInput";
import OverlayLoader from "@/components/FormInput/OverLayLoader";
import FormCheckboxInput from "@/components/FormInput/FormCheckBoxInput";
import useUserStore from "@/lib/zustand/userStore";
import { secureAxios } from "@/utils/secureAxios";
import { useRouter } from "next/navigation";
import { CustomAlert } from "@/utils/handleCustomAlert";

const AddNews = () => {
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
        "CareLink/news"
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
        tag: "news",
        journalist: user?.name,
      };

      const postStoryRes = await secureAxios(
        "post",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/news`,
        finalData,
        user
      );
      if (postStoryRes.data.insertedId) {
        reset();
        setImageFile(null);
        CustomAlert({
          alertText: "News added !",
          alertType: "succeed",
        });
        router.push("/admin/manage-news");
      }
    } catch (error) {
      console.error("Error:", error);
      CustomAlert({
        alertText: "Failed to add news.",
        alertType: "error",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeading heading={"Add a News"}></SectionHeading>
      <div className="bg-gray-300 p-6 rounded-md relative">
        {isSubmitting && <OverlayLoader message="Submitting..." />}

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

          {/* Introduction */}
          <FormTextAreaInput
            label="Introduction*"
            name="introduction"
            placeholder="News introduction..."
            register={register}
            required={true}
            errors={errors}
          />
          {/* Background / Context */}
          <FormTextAreaInput
            label="Background / Context*"
            name="context"
            placeholder="Write about the context shortly..."
            register={register}
            required={true}
            errors={errors}
          />
          {/* Main Part */}
          <FormTextAreaInput
            label="Main Part*"
            name="mainPart"
            placeholder="News main part..."
            register={register}
            required={true}
            errors={errors}
          />

          {/* Next Steps */}
          <FormTextAreaInput
            label="Next Steps*"
            name="nextStep"
            placeholder="Steps to take forward..."
            register={register}
            required={true}
            errors={errors}
          />
          {/* Expected Outcome */}
          <FormTextAreaInput
            label="Expected Outcome*"
            name="outcome"
            placeholder="Possible outcome..."
            register={register}
            required={true}
            errors={errors}
          />
          {/* Call for Support */}
          <FormTextAreaInput
            label="Call for Support*"
            name="appeal"
            placeholder="How people can participate..."
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

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0"
              disabled={isSubmitting}
            >
              Add News
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddNews;
