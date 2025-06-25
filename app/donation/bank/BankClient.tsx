// app/donation/bank/BankClient.tsx
"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams, useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function BankClient() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const params = useSearchParams();
  const amtParam = params?.get("amt") ?? "0";
  const amt = parseInt(amtParam, 10) || 0;
  const monthly = (params?.get("monthly") ?? "false") === "true";
  const cause = params?.get("cause") ?? "";

  useEffect(() => {
    async function createIntent() {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amt * 100,
          isMonthly: monthly,
          paymentMethod: "bank",
          cause,
        }),
      });
      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    }
    createIntent();
  }, [amt, monthly, cause]);

  if (!clientSecret) {
    return <div className="p-6 text-center">Loading bank payment form…</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <BankForm />
    </Elements>
  );
}

function BankForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/donation/success",
      },
    });

    router.push(error ? "/donation/error" : "/donation/success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-4">Bank (ACH) Payment</h2>
      <PaymentElement className="border p-2 rounded mb-6" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Pay with Bank
      </button>
    </form>
  );
}
