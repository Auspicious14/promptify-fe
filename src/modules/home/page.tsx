import { Button } from "@/components";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../auth/context";
export const HomePage = () => {
  const router = useRouter();
  const { user } = useAuth(); // Assume you have auth context

  const handleTryNow = () => {
    if (!user) return router.push("/auth/register");
    router.push("/refine");
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
          <Button
            variant="secondary"
            onClick={() => router.push("/auth/register")}
          >
            Create Account
          </Button>
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

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Upgrade for More Power</h2>
          <p className="text-gray-600 mb-6">
            Free users get 5 prompt refinements per day. Upgrade to Pro for
            unlimited access and priority processing.
          </p>
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            <div className="bg-white shadow-md p-6 rounded-xl w-64">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-gray-500 mb-4">5 prompts/day</p>
              <Button onClick={() => router.push("/auth/register")}>
                Get Started
              </Button>
            </div>
            <div className="bg-blue-600 text-white shadow-lg p-6 rounded-xl w-64">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="mb-4">Unlimited prompts, fast response</p>
              <Button
                variant="white"
                size="md"
                onClick={() => router.push("/pricing")}
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
