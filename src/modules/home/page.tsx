import React from "react";
export const HomePage = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
          Write Better Prompts. Get Smarter AI Responses.
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Our platform helps you refine your prompts for ChatGPT, Claude, and
          other AI models. Whether you're writing for marketing, legal,
          education, or tech — we make your prompts clearer, sharper, and more
          effective.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/prompt-refiner"
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Try It Now
          </a>
          <a
            href="#how-it-works"
            className="border border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition"
          >
            Learn More
          </a>
        </div>
      </div>

      <div id="how-it-works" className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            1. Choose your preferred AI model (GPT-3.5, Claude, Groq, etc).
          </p>
          <p className="text-lg text-gray-600 mb-4">
            2. Select your domain (e.g. technical, legal, education).
          </p>
          <p className="text-lg text-gray-600 mb-4">
            3. Paste your prompt — we’ll refine it using context-aware
            algorithms.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            4. Copy and send the enhanced prompt to your LLM of choice.
          </p>
        </div>
      </div>
    </section>
  );
};
