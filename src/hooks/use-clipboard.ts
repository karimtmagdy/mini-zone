import * as React from "react";
import { toast } from "sonner";

export type UseClipboardReturn = {
  copied: boolean;
  copy: (text: string) => void;
};

export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000);
    }
    return () => {
      clearTimeout(setTimeout(() => setCopied(false), 1000));
    };
  }, [copied]);
  return {
    copied,
    copy: (text: string) => {
      navigator.clipboard.writeText(text);
      if (text) {
        toast.success("Copied to clipboard");
        setCopied(true);
      } else {
        toast.error("Failed to copy");
      }
    },
  };
}
