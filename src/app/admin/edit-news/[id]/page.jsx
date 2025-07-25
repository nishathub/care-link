"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import FormTextInput from "@/components/FormInput/FormTextInput";
import FormTextAreaInput from "@/components/FormInput/FormTextAreaInput";
import OverlayLoader from "@/components/FormInput/OverLayLoader";
import FormCheckboxInput from "@/components/FormInput/FormCheckBoxInput";
import { useParams, useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import axios from "axios";
import { CustomAlert } from "@/utils/handleCustomAlert";

const UpdateNews = () => {
  const { id: newsId } = useParams();
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

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      setInitialDataLoading(true);
      try {
        const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
        const { data } = await axios.get(`${careLinkAPI}/news/${newsId}`);
        setInitialData(data.data);
        reset(data.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setInitialDataLoading(false);
      }
    };

    if (newsId) fetchNews();
  }, [newsId, reset]);

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
          "CareLink/news"
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
        `${careLinkAPI}/news/${newsId}`,
        finalData,
        user
      );
      if (patchRes.data.success) {
        CustomAlert({
          alertText: "News updated !",
          alertType: "succeed",
        });
        router.push("/admin/manage-news");
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

  if (initialDataLoading) return <OverlayLoader message="Loading news..." />;
  if (!initialDataLoading && !initialData)
    return <OverlayLoader message="News Data Loading Failed" />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-300 rounded-lg shadow-2xl p-4 md:p-6 relative">
        {isSubmitting && <OverlayLoader message="Submitting..." />}

        <h2 className="text-xl md:text-3xl font-semibold text-center capitalize text-gray-900 mb-6">
          Edit news
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
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
          </div>
          {/* Hidden Checkbox*/}
          <FormCheckboxInput
            label="Hide this news"
            name="hidden"
            register={register}
          />

          <div>
            <button
              type="submit"
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0 w-full"
              disabled={isSubmitting}
            >
              Update News
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNews;
