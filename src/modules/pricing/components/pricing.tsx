// components/Pricing.tsx
import { Button } from "@/components";
import React from "react";

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

export const PricingComponent: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary">Pricing Plans</h2>
        <p className="text-lg text-gray-600 my-4">
          Choose the plan that best fits your needs
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-xl text-primary my-4">{plan.price}</p>
              <ul className="list-disc list-inside text-left text-gray-600 mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Button variant="primary" size="lg" className="w-full">
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
