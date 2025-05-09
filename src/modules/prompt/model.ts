export interface IPromptForm {
  prompt: string;
  llm: LLM;
  domain: string;
}
type LLM =
  | "default"
  | "premium"
  | "mistral"
  | "grok"
  | "cinematika"
  | "nous-capybara"
  | "command-r"
  | "dolphin"
  | "llama3"
  | "gemma"
  | "microsoft"
  | "qwen"
  | "deepseek"
  | "gemini"
  | "amazon"
  | "gpt-4";
export interface IPrompt {
  _id: string;
  userId: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
}

export const modelOptions = [
  { value: "mistral" as LLM, label: "Mistral" },
  { value: "grok" as LLM, label: "Grok" },
  { value: "cinematika" as LLM, label: "Cinematika" },
  { value: "nous-capybara" as LLM, label: "Nous Capybara" },
  { value: "command-r" as LLM, label: "Command-R" },
  { value: "dolphin" as LLM, label: "Dolphin" },
  { value: "llama3" as LLM, label: "Llama 3" },
  { value: "gemma" as LLM, label: "Gemma" },
  { value: "microsoft" as LLM, label: "Microsoft" },
  { value: "qwen" as LLM, label: "Qwen" },
  { value: "deepseek" as LLM, label: "Deepseek" },
  { value: "gemini" as LLM, label: "Gemini" },
  { value: "amazon" as LLM, label: "Amazon" },
];

export const domainOptions = [
  { label: "General", value: "general" },
  { label: "Writing", value: "writing" },
  { label: "Marketing", value: "marketing" },
  { label: "Technical", value: "coding" },
  { label: "Design", value: "design"},
  { label: "Legal", value: "legal" },
  { label: "Education", value: "education" },
  { label: "Medical", value: "healthcare" },
  { label: "Business", value: "business" },
  { label: "Creative Arts", value: "creative_arts" },
  { label: "Data Analysis", value: "data_analysis" },
  { label: "Research", value: "research" }
];
