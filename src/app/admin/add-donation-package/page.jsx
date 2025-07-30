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
import useUserStore from "@/lib/zustand/userStore";
import { secureAxios } from "@/utils/secureAxios";
import { useRouter } from "next/navigation";
import { CustomAlert } from "@/utils/handleCustomAlert";

const AddDonationPackage = () => {
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
        "CareLink/donationPackages"
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
        date: new Date(),
      };

      const postStoryRes = await secureAxios(
        "post",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/donationPackages`,
        finalData,
        user
      );
      if (postStoryRes.data.insertedId) {
        reset();
        setImageFile(null);
        CustomAlert({
          alertText: "Package added !",
          alertType: "succeed",
        });
        router.push("/admin/manage-donation-packages");
      }
    } catch (error) {
      console.error("Error:", error);
      CustomAlert({
        alertText: "Failed to add package.",
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
          Add a new donation package
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* Package Title */}
          <FormTextInput
            label="Package Title*"
            name="title"
            placeholder="Education Fund"
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
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Related Quote */}
            <FormTextInput
              label="Quote 1"
              name="quote1"
              placeholder="A motivational quote.."
              register={register}
              required={true}
              errors={errors}
            />
            <FormTextInput
              label="Quote 2"
              name="quote2"
              placeholder="A motivational quote.."
              register={register}
              required={false}
              errors={errors}
            />
          </div>

          {/* Description */}
          <FormTextAreaInput
            label="Description*"
            name="description"
            placeholder="Package description..."
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
              "Flood",
              "Orphan",
              "General",
            ]}
          />

          {/* Hidden Checkbox*/}
          <FormCheckboxInput
            label="Hide this package"
            name="hidden"
            register={register}
          />

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="btn font-cinzel bg-sky-600 text-white hover:bg-sky-700 border-0 w-full"
              disabled={isSubmitting}
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddDonationPackage;
