"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { domainOptions, IPromptForm, modelOptions } from "./model";
import { Button, SelectInput, TextInput, CopyButton } from "@/components";
import { usePromptRefinerState } from "./context";
import { useAuth } from "../auth/context";

const initialValues: IPromptForm = {
  prompt: "",
  llm: "mistral",
  domain: "general",
};

const validationSchema = Yup.object({
  prompt: Yup.string().required("Prompt is required"),
  llm: Yup.string().required("Model is required"),
  domain: Yup.string().required("Domain is required"),
});

export const PromptRefinerPage = () => {
  const router = useRouter();
  const { isLoading, prompt, refinePrompt } = usePromptRefinerState();
  const { usage } = useAuth();

  const handleSubmit = async (values: IPromptForm) => {
    refinePrompt(values);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        Promptify
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    name="llm"
                    options={modelOptions}
                  />
                  <ErrorMessage
                    name="llm"
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
                    name="domain"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>

                <div className="pt-2">
                  {usage === null ? (
                    <Button
                      type="submit"
                      disabled={true}
                      className="w-full"
                      // isLoading={true}
                    >
                      Network Error... Reload the page to continue
                    </Button>
                  ) : usage.count < 3 ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full"
                      isLoading={isSubmitting || isLoading}
                    >
                      Refine Prompt
                    </Button>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-red-500">
                        You’ve used your 3 free trials. Come back tomorrow or
                        upgrade to Premium.
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => router.push("/pricing")}
                      >
                        Get Premium
                      </Button>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Refined Prompt
          </h2>
          {prompt ? (
            <div>
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                {prompt}
              </div>
              <CopyButton text={prompt} />
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
