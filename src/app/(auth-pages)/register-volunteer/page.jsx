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
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye } from "lucide-react";

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

  const handlePasswordVisibility = () => {
    setVisible(!isVisible);
  };

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
        approved: false,
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
        alert("Registration submitted! Please check your email");
        router.push("/registration-success");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-800">
      <div className="max-w-4xl mx-auto pt-12">
        <SectionHeading heading={"Volunteer Registration"} />

        <div className="bg-gray-300 p-6 rounded-md relative">
          {isSubmitting && <OverlayLoader message="Submitting..." />}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
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
            {/* Password */}
            <div className="relative">
              <button
                onClick={() => setVisible(!isVisible)}
                type="button"
                className="absolute z-10 right-5 top-1/2 text-sky-700 cursor-pointer"
              >
                <Eye />
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
              <span className="label-text text-gray-800">
                Profile Photo (optional)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="file-input file-input-bordered w-full bg-white text-gray-800"
              />
            </label>

            {/* Address */}
            <FormTextAreaInput
              label="Address*"
              name="address"
              placeholder="House ##, Road 10, Gulshan-1, Dhaka-1212"
              register={register}
              required={true}
              errors={errors}
            />

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
                className="btn bg-sky-600 text-white hover:bg-sky-700 border-0"
                disabled={isSubmitting}
              >
                Register as Volunteer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegistration;
