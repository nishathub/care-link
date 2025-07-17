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
import { useParams, useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import axios from "axios";

const UpdateOngoingProject = () => {
  const { id: projectId } = useParams();
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

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      setInitialDataLoading(true);
      try {
        const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
        const { data } = await axios.get(
          `${careLinkAPI}/ongoingProjects/${projectId}`
        );
        setInitialData(data.data);
        reset(data.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setInitialDataLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId, reset]);

  // Submit updated data
  const onSubmit = async (data) => {
    if (user?.name !== initialData?.author) {
      alert("Unauthorized!");
      router.push("/volunteer/manage-projects");
      return;
    }
    setIsSubmitting(true);

    try {
      let imageURL = initialData?.imageLink || "";
      let cloudinaryPublicId = initialData?.cloudinaryPublicId || "";

      // If a new image was selected
      if (imageFile) {
        const uploaded = await uploadImageToCloudinary(
          imageFile,
          "CareLink/ongoingProjects"
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
        `${careLinkAPI}/ongoingProjects/${projectId}`,
        finalData,
        user
      );
      if (patchRes.data.success) {
        alert("Project updated successfully!");
        router.push("/volunteer/manage-projects");
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

  if (initialDataLoading) return <OverlayLoader message="Loading project..." />;

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeading heading={"Edit Project"} />

      <div className="bg-gray-300 p-6 rounded-md relative">
        {isSubmitting && <OverlayLoader message="Updating..." />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormTextInput
            label="Project Title*"
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

          <FormDynamicFieldList
            control={control}
            register={register}
            required={true}
            name="expenseCategories"
            label="Expense Categories"
          />

          {/* Background / Context */}
          <FormTextAreaInput
            label="Background / Context*"
            name="context"
            placeholder="Write about the context/situation shortly..."
            register={register}
            required={true}
            errors={errors}
          />
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
          {/* Call for Support */}
          <FormTextAreaInput
            label="Call for Support*"
            name="appeal"
            placeholder="How people can participate..."
            register={register}
            required={true}
            errors={errors}
          />
          {/* Expected Outcome */}
          <FormTextAreaInput
            label="Numeric Details*"
            name="numericDetails"
            placeholder="50 bags for distribution../ 2 living rooms to build.. according to expense categories"
            register={register}
            required={true}
            errors={errors}
          />
          {/* Conclusion */}
          <FormTextAreaInput
            label="Conclusion*"
            name="conclusion"
            placeholder="conclusion..."
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

export default UpdateOngoingProject;
