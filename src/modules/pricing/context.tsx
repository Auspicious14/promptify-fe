"use client";
import { AxiosClient } from "@/components";
import { createContext, useContext, useEffect, useState } from "react";

interface IPricingContext {
  isLoading: boolean;
  subscribe: (planId: string) => Promise<void>;
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

  const subscribe = async (planId: string) => {
    try {
      const response = await AxiosClient.post("/subscribe", { planId });
      const data = response.data;
      if (data.success) {
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
