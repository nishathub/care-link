"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle } from "lucide-react";
import useUserStore from "@/lib/zustand/userStore";
import StripePaymentModal from "../StripePaymentModal/StripePaymentModal";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export default function DonationForm() {
  const presetAmounts = [10, 25, 50, 100];
  const user = useUserStore((state) => state?.user);
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(presetAmounts[0]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bill: selectedAmount,
      name: user?.name || "",
      contact: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    setFormData(data);
    setShowModal(true);
    return;
  };

  return (
    <div className="bg-sky-100 rounded-lg shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Make a Donation</h2>

      {/* Preset Amount Boxes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {presetAmounts.map((amt) => (
          <div
            key={amt}
            className={`p-4 rounded-lg cursor-pointer text-center border-2 transition ${
              selectedAmount === amt
                ? "bg-sky-200 border-sky-700"
                : "bg-white border-gray-300"
            }`}
            onClick={() => {
              setSelectedAmount(amt);
              setValue("bill", amt);
            }}
          >
            ${amt}
            {selectedAmount === amt && (
              <CheckCircle className="inline ml-2" size={16} />
            )}
          </div>
        ))}
      </div>

      {/* Donation Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="hidden"
          value={selectedAmount}
          {...register("bill", { required: true })}
        />

        <div>
          <p className="mb-2 text-sm"><label >Name</label></p>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered bg-sky-200 w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm"><label >Contact</label></p>
          <input
            type="text"
            placeholder="Email or Phone"
            className="input input-bordered bg-sky-200 w-full"
            {...register("contact", {
              required: "Email or phone is required",
              minLength: { value: 5, message: "Too short" },
            })}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Donate
        </button>
      </form>
      <Elements stripe={stripePromise}>
        <StripePaymentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          amount={selectedAmount}
          formData={formData}
          user={user}
        />
      </Elements>
    </div>
  );
}
