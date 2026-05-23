import { useCallback, useEffect, useRef, useState } from "react";
import { COPY_RESET_MS } from "@/features/contact/constants/contact";

export function useCopyEmail(email) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch {
      setCopied(false);
    }
  }, [email]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return { copied, copyEmail };
}
