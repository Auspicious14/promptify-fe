export interface IPromptForm {
  prompt: string;
  model: string;
  domain: string;
}

export interface IRefinedResponse {
  refinedPrompt: string;
}

export const modelOptions = [
  { value: "gpt-3.5", label: "GPT-3.5" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  { value: "mixtral", label: "Mixtral (Groq)" },
];

export const domainOptions = [
  { label: "General", value: "general" },
  { label: "Marketing", value: "marketing" },
  { label: "Technical", value: "technical" },
  { label: "Legal", value: "legal" },
  { label: "Education", value: "education" },
  { label: "Medical", value: "medical" },
  { label: "Finance", value: "finance" },
];
