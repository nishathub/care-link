"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const StripePaymentModal = ({
  isOpen,
  onClose,
  amount,
  formData,
  user,
  tag,
  title,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!amount || !isOpen) return;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_CareLinkAPI}/stripe-payment-intent`,
          { price: amount }
        );
        setClientSecret(res?.data?.clientSecret);
      } catch (err) {
        console.error("Intent error", err);
      }
    };
    createPaymentIntent();
  }, [amount, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setError("");
    setLoading(true);

    const card = elements.getElement(CardElement);
    const { error: cardErr, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardErr) {
      setError(cardErr.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: formData?.name || "Anonymous",
          },
        },
      });

    if (confirmErr) {
      setError(confirmErr.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const finalData = {
        paymentId: paymentIntent.id,
        contact: formData?.contact,
        donor: formData?.name,
        date: new Date(),
        amount: formData?.bill,
        tag: tag,
        title: title,
        approved: "pending",
      };
      try {
        const LogRes = await axios.post(
          `${process.env.NEXT_PUBLIC_CareLinkAPI}/donationLogs`,
          finalData
        );
        if (LogRes.data.insertedId) {
          setLoading(false);
          alert("payment successful");
          router.push("/");
        }
      } catch (error) {
        console.error("donation log post err")
      }
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Complete Your Donation</h2>
        <p>
          <strong>Name:</strong> {formData?.name}
        </p>
        <p>
          <strong>Email/Phone:</strong> {formData?.contact}
        </p>
        <p>
          <strong>Amount:</strong> ${amount}
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="border p-2 rounded">
            <CardElement
              options={{
                style: {
                  base: { fontSize: "16px", color: "#424770" },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <button
            type="submit"
            disabled={!stripe || !elements || !clientSecret || loading}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {loading && (
          <div className="mt-4">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripePaymentModal;
