"use client";
import { AxiosClient } from "@/components";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IPricingContext {
  isLoading: boolean;
  subscribe: (plan: string) => Promise<any>;
  verifyPayment: (reference: string) => Promise<any>;
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState<any>();

  const subscribe = async (plan: string) => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.post("/subscribe", { plan });
      const data = response.data;
      if (data.success) {
        toast.success("Redirecting to payment page...");
        window.location.href = data?.data?.authorizationUrl;

        setPayment(data?.data);
        return data.data;
      }
    } catch (error: any) {
      console.error("Subscription failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "Subscription failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get("/verify", {
        params: { reference },
      });
      const data = response.data;
      if (data.success) {
        toast.success("Payment verified successfully!");
        router.push("/prompt");
        return data;
      }
    } catch (error) {
      toast.error("Payment verification failed.");
      console.error("Subscription failed:", error);
      router.push("/pricing");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PricingContext.Provider value={{ isLoading, subscribe, verifyPayment }}>
      {children}
    </PricingContext.Provider>
  );
};
