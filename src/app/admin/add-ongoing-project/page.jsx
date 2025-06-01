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
import axios from "axios";
import useUserStore from "@/lib/zustand/userStore";

const AddOngoingProjects = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const user = useUserStore((state)=> state?.user);

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
        "CareLink/OngoingProjects"
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
      };

      if(!user || user?.role !== "admin") {
       return alert("Admin Access Only");
      }
      const postProjectRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects`,
        finalData,
        {withCredentials: true}
      );
      if (postProjectRes.data.insertedId) {
        // reset();
        setImageFile(null);
        alert("Project added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeading heading={"Add a new Project"}></SectionHeading>

      <div className="bg-gray-300 p-6 rounded-md relative">
        {isSubmitting && <OverlayLoader message="Submitting..." />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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

          {/* Related Quote */}
          <FormTextInput
            label="Related Quote"
            name="relatedQuote"
            placeholder="A motivational quote.."
            register={register}
            required={false}
            errors={errors}
          />

          {/* Expense Categories */}
          <FormDynamicFieldList
            control={control}
            register={register}
            required={true}
            name="expenseCategories"
            label="Expense Categories"
          />

          {/* Description */}
          <FormTextAreaInput
            label="Description*"
            name="description"
            placeholder="Project description..."
            register={register}
            required={true}
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
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0"
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
