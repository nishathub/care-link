"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";

const StripePaymentModal = ({ isOpen, onClose, amount, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
            email: formData?.email || "no-reply@example.com",
          },
        },
      });

    if (confirmErr) {
      setError(confirmErr.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      console.log("payment is successful");
      setLoading(false);
      return;
      try {
        await axiosProtected.post("/userPaymentHistory", {
          paymentId: paymentIntent.id,
          userEmail: user?.email,
          date: new Date(),
          price: amount,
          status: "processing",
        });
        customAlert("Payment successful!");
        onClose();
        setTimeout(() => {
          navigate(user ? "/userDashboard" : "/");
        }, 1000);
      } catch (err) {
        console.error("History post error", err);
      }
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
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
