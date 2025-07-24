"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import FormTextInput from "@/components/FormInput/FormTextInput";
import FormTextAreaInput from "@/components/FormInput/FormTextAreaInput";
import OverlayLoader from "@/components/FormInput/OverLayLoader";
import FormCheckboxInput from "@/components/FormInput/FormCheckBoxInput";
import FormSelectInput from "@/components/FormInput/FormSelectInput";
import FormDynamicFieldList from "@/components/FormInput/FormDynamicFieldList";
import useUserStore from "@/lib/zustand/userStore";
import { secureAxios } from "@/utils/secureAxios";
import { useRouter } from "next/navigation";
import { CustomAlert } from "@/utils/handleCustomAlert";

const AddOngoingProjects = () => {
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
  } = useForm({
    defaultValues: {
      expenseCategories: [""],
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // First we upload the image to cloudinary and get url
      const { secure_url, public_id } = await uploadImageToCloudinary(
        imageFile,
        "CareLink/ongoingProjects"
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
        author: user?.name,
        approved: "pending",
      };

      const postProjectRes = await secureAxios(
        "post",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects`,
        finalData,
        user
      );
      if (postProjectRes.data.insertedId) {
        reset();
        setImageFile(null);
        CustomAlert({
          alertText: "Project added !",
          alertType: "succeed",
        });
        router.push("/volunteer/manage-projects");
      }
    } catch (error) {
      console.error("Error:", error);
      CustomAlert({
        alertText: "Failed to add project. !",
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

        <h2 className="text-xl md:text-3xl font-semibold text-center capitalize text-gray-900 mb-6">
          Add a new Project
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Project Title */}
            <FormTextInput
              label="Project Title*"
              name="title"
              placeholder="Water for all.."
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
            {/* Expense Categories */}
            <FormDynamicFieldList
              control={control}
              register={register}
              required={true}
              name="expenseCategories"
              label="Expense Categories"
            />
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
          </div>
            {/* Background / Context */}
            <FormTextAreaInput
              label="Background / Context*"
              name="context"
              placeholder="Write about the context/situation shortly..."
              register={register}
              required={true}
              errors={errors}
            />
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Goal */}
            <FormTextAreaInput
              label="Goal*"
              name="goal"
              placeholder="What we are focusing to solve..."
              register={register}
              required={true}
              errors={errors}
            />
            {/* Strategy */}
            <FormTextAreaInput
              label="Strategy*"
              name="strategy"
              placeholder="How we are working..."
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Numeric Details */}
            <FormTextAreaInput
              label="Numeric Details*"
              name="numericDetails"
              placeholder="50 bags for distribution../ 2 living rooms to build.. according to expense categories"
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
          </div>

          {/* Hidden Checkbox*/}
          <FormCheckboxInput
            label="Hide this project"
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
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddOngoingProjects;
