"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { domainOptions, IPromptForm, modelOptions } from "./model";
import { Button, SelectInput, TextInput } from "@/components";
import { usePromptRefinerState } from "./context";

const initialValues: IPromptForm = {
  prompt: "",
  model: "gpt-3.5",
  domain: "general",
};

const validationSchema = Yup.object({
  prompt: Yup.string().required("Prompt is required"),
  model: Yup.string().required("Model is required"),
  domain: Yup.string().required("Domain is required"),
});
export const PromptRefinerPage = () => {
  const { isLoading, prompt, refinePrompt } = usePromptRefinerState();

  const handleSubmit = async (values: IPromptForm) => {
    refinePrompt(values);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        AI Prompt Refiner
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Enter Raw Prompt
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <TextInput
                    type="textarea"
                    name="prompt"
                    rows={8}
                    placeholder="Describe your task or question..."
                    label={""}
                  />
                </div>

                <div>
                  <SelectInput
                    label="Choose LLM"
                    name="model"
                    options={modelOptions}
                  />
                  <ErrorMessage
                    name="model"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
                <div>
                  <SelectInput
                    label="Select Domain"
                    name="domain"
                    options={domainOptions}
                  />
                  <ErrorMessage
                    name="model"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full"
                    isLoading={isSubmitting || isLoading}
                  >
                    Refine Prompt
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Output Panel */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Refined Prompt
          </h2>
          {prompt ? (
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
              {prompt}
            </div>
          ) : (
            <p className="text-gray-400 italic">
              Your refined prompt will appear here after submission.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
