"use client";

import { createContext, useContext, useState } from "react";
import { IPrompt, IPromptForm } from "./model";
import { AxiosClient } from "@/components";
import toast from "react-hot-toast";

interface IPromptContext {
  isLoading: boolean;
  prompts: IPrompt[];
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
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const refinePrompt = async (values: IPromptForm) => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.post("/refine-prompt", values);
      const data = response.data?.data;
      if (data) {
        setPrompt(data.prompt);
        return data;
      }
      return null;
    } catch (error: any) {
      toast.error("Error refining prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPrompts = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosClient.get("/prompts");
      const data = response.data?.data;
      if (data) {
        setPrompts(data);
        return data;
      }
      return null;
    } catch (error: any) {
      toast.error("Error getting prompts.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PromptRefinerContext.Provider
      value={{ isLoading, prompt, prompts, refinePrompt }}
    >
      {children}
    </PromptRefinerContext.Provider>
  );
};
