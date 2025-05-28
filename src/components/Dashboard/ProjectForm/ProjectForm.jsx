"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import FormTextInput from "@/components/FormInput/FormTextInput";
import FormTextAreaInput from "@/components/FormInput/FormTextAreaInput";
import OverlayLoader from "@/components/FormInput/OverLayLoader";
import FormCheckboxInput from "@/components/FormInput/FormCheckBoxInput";

const ProjectForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "expenseCategories",
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

      const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
      const postProjectRes = await axios.post(
        `${careLinkAPI}/ongoingProjects`,
        finalData
      );
      if (postProjectRes.data.insertedId) {
        console.log(postProjectRes.data);
        reset();
        setImageFile(null);
        alert("Project added successfully!");
      }
    } catch (error) {
      console.error("Submit Error:", error);
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
          <div>
            <span className="label-text text-gray-800">
              Expense Categories*
            </span>
            <div className="space-y-2 mt-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    {...register(`expenseCategories.${index}`, {
                      required: "Category cannot be empty",
                    })}
                    placeholder={`Category ${index + 1}`}
                    className="input input-bordered w-full bg-white text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm cursor-pointer hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append("")}
                className="btn btn-sm bg-gray-700 text-white mt-2"
              >
                + Add Category
              </button>
            </div>
          </div>

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
          <label className="form-control w-full">
            <p className="label-text text-gray-800">Tag*</p>
            <select
              {...register("tag", { required: true })}
              className="select select-bordered bg-white text-gray-800"
              defaultValue=""
            >
              <option value="" disabled>
                Select a tag
              </option>
              <option value="Livelihood">Livelihood</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Emergency">Emergency</option>
            </select>
            {errors.tag && <p className="text-red-500 mt-1">Tag is required</p>}
          </label>

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
              className="btn bg-sky-800 text-white hover:bg-sky-900"
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

export default ProjectForm;
