import { cn } from "@lib/utils";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  hasCopied: boolean;
  className?: string;
};
function RenderCopyClipboardIcon({ hasCopied, className }: Props) {
  return (
    <>
      {hasCopied ? (
        <ClipboardCheck className={cn("w-5", className)} />
      ) : (
        <ClipboardCopy className={cn("w-5", className)} />
      )}
    </>
  );
}

const clipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export function useClipboard() {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 1000);
    }
  }, [hasCopied]);

  const copyToClipboard = (text: string) => {
    clipboard(text);
    setHasCopied(true);
  };

  return { copyToClipboard, hasCopied, RenderCopyClipboardIcon, clipboard };
}
