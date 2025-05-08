import React, { useState } from "react";
import { Button } from "./index";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

type Props = {
  text: string;
};

export const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      onClick={handleCopy}
      className="flex items-center gap-1 text-sm text-primary hover:underline focus:outline-none mt-2"
      icon={copied ? CheckIcon : DocumentDuplicateIcon}
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
};
