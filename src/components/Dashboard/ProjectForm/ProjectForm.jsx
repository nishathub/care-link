"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

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

  const handleImageUpload = async () => {
    if (!imageFile) return { secure_url: null, public_id: null };

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", "CareLink/OngoingProjects");

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
        alert("Failed to upload image");
        console.error("Cloudinary response error:", res.data);
        return { secure_url: null, public_id: null };
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed!");
      return { secure_url: null, public_id: null };
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { secure_url, public_id } = await handleImageUpload();

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
        {isSubmitting && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <p className="text-white text-lg">Submitting...</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* Project Title */}
          <label className="form-control w-full">
            <span className="label-text text-gray-800">Project Title*</span>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Project Title"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.projectTitle && (
              <p className="text-red-500 mt-1">Project title is required</p>
            )}
          </label>

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
          <label className="form-control w-full">
            <span className="label-text text-gray-800">Related Quote</span>
            <input
              type="text"
              {...register("relatedQuote")}
              placeholder="A motivational quote..."
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </label>

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
          <label className="form-control w-full">
            <span className="label-text text-gray-700">Description*</span>
            <textarea
              {...register("description", { required: true })}
              placeholder="Project description..."
              rows={4}
              className="textarea textarea-bordered w-full bg-white text-gray-800"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 mt-1">Description is required</p>
            )}
          </label>

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

          {/* Hidden */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("hidden")}
              className="checkbox checkbox-primary"
            />
            <span className="label-text text-gray-800">Hide this project</span>
          </label>

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
