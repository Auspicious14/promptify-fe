"use client";
import { Button } from "@/components";
import React from "react";
import { useRouter } from "next/navigation";

interface IPricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
}

const pricingPlans: IPricingPlan[] = [
  {
    name: "Free",
    price: "$0/month",
    features: ["Access to prompt refining", "3 usage per day", "Basic support"],
    buttonText: "Start Free Trial",
  },
  {
    name: "Premium",
    price: "$1.99/month",
    features: [
      "Access to prompt refining",
      "Unlimited usage",
      "Priority support",
      "Advanced LLMs",
    ],
    buttonText: "Get Premium",
  },
];

interface IProps {
  loading?: boolean;
  onSubscribe?: (name: string) => void;
  OnRoute?: () => void;
}

export const PricingComponent: React.FC<IProps> = ({
  loading,
  onSubscribe,
  OnRoute,
}) => {
  const router = useRouter();

  const handlePlanSelect = (planName: string) => {
    const lowerPlan = planName.toLowerCase();
    if (OnRoute) {
      OnRoute();
    } else {
      if (lowerPlan === "free") {
        router.push("/prompt");
      } else {
        onSubscribe && onSubscribe(lowerPlan);
      }
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary">Pricing Plans</h2>
        <p className="text-lg text-gray-600 my-4">
          Choose the plan that best fits your needs
        </p>
        <div className="flex flex-col md:flex-row md:justify-center w-full gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-xl text-primary my-4">{plan.price}</p>
              <ul className="list-disc list-inside text-left text-gray-600 mb-4 h-24">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Button
                isLoading={loading}
                disabled={loading}
                onClick={() => handlePlanSelect(plan.name)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
