"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import FormTextInput from "@/components/FormInput/FormTextInput";
import FormTextAreaInput from "@/components/FormInput/FormTextAreaInput";
import OverlayLoader from "@/components/FormInput/OverLayLoader";
import FormCheckboxInput from "@/components/FormInput/FormCheckBoxInput";
import FormSelectInput from "@/components/FormInput/FormSelectInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { CustomAlert } from "@/utils/handleCustomAlert";

const VolunteerRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Optional: Upload profile photo
      let imageLink = "";
      let public_id = "";
      if (imageFile) {
        const uploadRes = await uploadImageToCloudinary(
          imageFile,
          "CareLink/volunteers"
        );
        imageLink = uploadRes.secure_url || "";
        public_id = uploadRes.public_id || "";
      }

      const finalData = {
        ...data,
        imageLink: imageLink,
        cloudinaryPublicId: public_id,
        approved: "pending",
        createdAt: new Date(),
        role: "volunteer",
      };

      const postRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/allUsers`,
        finalData
      );

      if (postRes.data.insertedId) {
        reset();
        setImageFile(null);
        CustomAlert({
          alertText: "Registration submitted!",
          alertType: "succeed",
        });
        router.push("/registration-success");
      }
    } catch (error) {
      console.error("Error:", error);
      CustomAlert({
        alertText: "Registration Failed!",
        alertType: "error",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-300 rounded-xl shadow-2xl p-4 md:p-8 relative">
      <h2 className="text-xl md:text-3xl font-semibold text-center text-gray-900 mb-6">
        Volunteer Registration
      </h2>
      <div className="">
        {isSubmitting && <OverlayLoader message="Submitting..." />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Full Name */}
            <FormTextInput
              label="Full Name*"
              name="name"
              placeholder="Your Full Name"
              register={register}
              required={true}
              errors={errors}
            />

            {/* Email */}
            <FormTextInput
              label="Email*"
              name="email"
              type="email"
              placeholder="mail@example.com"
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Password */}
            <div className="relative">
              <button
                onClick={() => setVisible(!isVisible)}
                type="button"
                className="absolute z-10 right-5 top-1/2 text-sky-700 cursor-pointer"
              >
                {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <FormTextInput
                label="Password*"
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="*********"
                register={register}
                required={true}
                errors={errors}
              />
            </div>

            {/* Phone Number */}
            <FormTextInput
              label="Phone Number*"
              name="phone"
              placeholder="+8801XXXXXXX"
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Occupation */}
            <FormTextInput
              label="Occupation"
              name="occupation"
              placeholder="Teacher"
              register={register}
              required={false}
              errors={errors}
            />

            {/* Profile Photo */}
            <label className="form-control w-full">
              <p className="label-text text-gray-800 mb-1">
                Profile Photo (optional)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="file-input file-input-bordered w-full bg-white text-gray-800"
              />
            </label>
          </div>

          {/* Address */}
          <FormTextAreaInput
            label="Address*"
            name="address"
            placeholder="House ##, Road 10, Gulshan-1, Dhaka-1212"
            register={register}
            required={true}
            errors={errors}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
            {/* Interest Area */}
            <FormSelectInput
              label="Area of Interest*"
              name="interestArea"
              register={register}
              required={true}
              errors={errors}
              options={[
                "Education",
                "Health",
                "Community Development",
                "Environment",
                "Emergency Response",
              ]}
            />

            {/* Reference */}
            <FormTextInput
              label="Reference*"
              name="reference"
              placeholder="Md Kashem (journalist)"
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          {/* Availability Checkbox */}
          <FormCheckboxInput
            label="I am available to volunteer immediately"
            name="availableNow"
            register={register}
          />

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="btn bg-sky-600 text-white hover:bg-sky-700 border-0 w-full mt-2"
              disabled={isSubmitting}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerRegistration;
