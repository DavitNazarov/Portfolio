import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactSubmitButton({ isSubmitting }) {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={isSubmitting ? undefined : { scale: 1.01, y: -1 }}
      whileTap={isSubmitting ? undefined : { scale: 0.98 }}
      className={cn(
        "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all",
        "bg-foreground text-background hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-55"
      )}
    >
      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      {isSubmitting ? "Sending..." : "Send message"}
    </motion.button>
  );
}
