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
import { useParams, useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import axios from "axios";
import { CustomAlert } from "@/utils/handleCustomAlert";

const UpdateDonationPackage = () => {
  const { id: packageId } = useParams();
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

  // Fetch story data
  useEffect(() => {
    const fetchStory = async () => {
      setInitialDataLoading(true);
      try {
        const careLinkAPI = process.env.NEXT_PUBLIC_CareLinkAPI;
        const { data } = await axios.get(
          `${careLinkAPI}/donationPackages/${packageId}`
        );
        setInitialData(data.data);
        reset(data.data);
      } catch (err) {
        console.error("Failed to fetch package:", err);
      } finally {
        setInitialDataLoading(false);
      }
    };

    if (packageId) fetchStory();
  }, [packageId, reset]);

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
          "CareLink/donationPackages"
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
        `${careLinkAPI}/donationPackages/${packageId}`,
        finalData,
        user
      );
      if (patchRes.data.success) {
        CustomAlert({
          alertText: "Package updated !",
          alertType: "succeed",
        });
        router.push("/admin/manage-donation-packages");
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

  if (initialDataLoading) return <OverlayLoader message="Loading package..." />;
  if (!initialDataLoading && !initialData)
    return <OverlayLoader message="Package Data Loading Failed" />;

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeading heading={"Edit Project"} />

      <div className="bg-gray-300 p-6 rounded-md relative">
        {isSubmitting && <OverlayLoader message="Updating..." />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* Story Title */}
          <FormTextInput
            label="Package Title*"
            name="title"
            placeholder="Education Fund"
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
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0"
              disabled={isSubmitting}
            >
              Update Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonationPackage;
