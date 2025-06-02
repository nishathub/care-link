import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET);

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { price } = body;

    const amount = parseInt(price * 100);

    if (isNaN(amount)) {
      return NextResponse.json(
        { errorMessage: "Invalid amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
