"use client";
import { AxiosClient } from "@/components";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IPricingContext {
  isLoading: boolean;
  subscribe: (plan: string) => Promise<void>;
}

const PricingContext = createContext<IPricingContext | null>(null);

export const usePricingState = () => {
  const context = useContext(PricingContext);
  if (!context)
    throw new Error("usePricing must be used within PricingProvider");
  return context;
};
export const PricingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (plan: string) => {
    try {
      const response = await AxiosClient.post("/subscribe", { plan });
      const data = response.data;
      if (data.success) {
        toast.success("Subscribed successfully!");
        return data;
      }
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PricingContext.Provider value={{ isLoading, subscribe }}>
      {children}
    </PricingContext.Provider>
  );
};
