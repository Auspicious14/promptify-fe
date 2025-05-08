"use client";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../auth/context";
import { PricingComponent } from "../pricing/components/pricing";
export const HomePage = () => {
  const router = useRouter();
  const { authStatus } = useAuth();

  const handleTryNow = () => {
    if (authStatus === "unauthenticated") return router.push("/signup");
    router.push("/prompt");
  };

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Craft Better Prompts. Get Smarter Results.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Use AI to refine your prompts for GPT, Claude, OpenRouter, and more —
          so you can get exactly what you want.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleTryNow}>Try It Now</Button>
          {authStatus === "unauthenticated" && (
            <Button variant="secondary" onClick={() => router.push("/signup")}>
              Create Account
            </Button>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Why Prompt Refinement?
        </h2>
        <p className="text-gray-600 mb-6">
          Most users don’t get accurate responses from AI because they don’t
          know how to prompt well. Our platform uses intelligent strategies to
          help you craft high-quality prompts that work.
        </p>
      </section>

      <PricingComponent />
    </div>
  );
};
