"use client";

import toast from "react-hot-toast";
import { usePricingState } from "./context";
import { PricingComponent } from "./components/pricing";

export const PricingPage = () => {
  const { isLoading, subscribe } = usePricingState();

  const handleSubscribe = async (plan: string) => {
    await subscribe(plan);
    toast.success("Subscribed successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Choose a Plan</h2>
      <PricingComponent loading={isLoading} onSubscribe={handleSubscribe} />
    </div>
  );
};
