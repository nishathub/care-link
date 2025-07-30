"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { CustomAlert } from "@/utils/handleCustomAlert";

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
    if (user?.role === "volunteer" && user?.name !== initialData?.author) {
      CustomAlert({
        alertText: "Unauthorized !",
        alertType: "error",
        duration: 2000,
      });
      console.error("Unauthorized");
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
      };

      const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
      const patchRes = await secureAxios(
        "patch",
        `${careLinkAPI}/ongoingProjects/${projectId}`,
        finalData,
        user
      );
      if (patchRes.data.success) {
        CustomAlert({
          alertText: "Project updated !",
          alertType: "succeed",
        });
        router.push("/volunteer/manage-projects");
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

  if (initialDataLoading) return <OverlayLoader message="Loading project..." />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-300 rounded-lg shadow-2xl p-4 md:p-6 relative">
        {isSubmitting && <OverlayLoader message="Submitting..." />}

        <h2 className="text-xl md:text-3xl font-semibold text-center capitalize text-gray-900 mb-6">
          Edit Project
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
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4"></div>
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

          <div>
            <button
              type="submit"
              className="btn font-cinzel bg-sky-600 text-white hover:bg-sky-700 border-0 w-full"
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
