"use client";

import { createContext, useContext, useState } from "react";
import { IPromptForm } from "./model";
import { AxiosClient } from "@/components";
import toast from "react-hot-toast";

interface IPromptContext {
  isLoading: boolean;
  prompt: string;
  refinePrompt: (values: IPromptForm) => Promise<{ refinedPrompt: string }>;
}

const PromptRefinerContext = createContext<IPromptContext | undefined>(
  undefined
);

export const usePromptRefinerState = () => {
  const context = useContext(PromptRefinerContext);
  if (!context)
    throw new Error(
      "usePromptRefiner must be used within PromptRefinerProvider"
    );
  return context;
};

export const PromptRefinerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const refinePrompt = async (values: IPromptForm) => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.post("/api/refine", values);
      const data = response.data?.data;
      if (data) {
        setPrompt(data.refinedPrompt);
        return data;
      }
      return null;
    } catch (error: any) {
      toast.error("Error refining prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PromptRefinerContext.Provider value={{ isLoading, prompt, refinePrompt }}>
      {children}
    </PromptRefinerContext.Provider>
  );
};
