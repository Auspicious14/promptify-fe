"use client";
import React, { useEffect } from "react";
import { usePricingState } from "../pricing/context";
import { useSearchParams } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

export const VerifyPayment = () => {
  const { isLoading, verifyPayment } = usePricingState();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (!reference || typeof reference !== "string") return;

    const verify = async () => {
      await verifyPayment(reference);
    };

    verify();
  }, [reference]);

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading && (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
        </div>
      )}
      <p className="text-xl font-medium">Verifying your payment...</p>
    </div>
  );
};
