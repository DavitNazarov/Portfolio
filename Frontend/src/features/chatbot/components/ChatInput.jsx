import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";

export default function ChatInput({ input, inputRef, onInputChange, onSend, thinking }) {
  const canSend = Boolean(input.trim()) && !thinking;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(input);
  };

  return (
    <form onSubmit={handleSubmit} className="relative px-5 py-4 pt-3">
      <div
        className="flex items-center gap-1.5 rounded-full border pl-4 pr-1.5 py-1 transition-colors duration-200 focus-within:border-white/25"
        style={{
          borderColor: `rgba(${CHATBOT_TINT}, 0.2)`,
          backgroundColor: "rgba(255,255,255,0.03)",
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Ask about Davit…"
          aria-label="Ask about Davit"
          className="flex-1 bg-transparent text-[13px] text-foreground/95 placeholder:text-muted-foreground/45 py-2 focus:outline-none"
        />
        <motion.button
          type="submit"
          disabled={!canSend}
          whileHover={{ scale: canSend ? 1.05 : 1 }}
          whileTap={{ scale: canSend ? 0.95 : 1 }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-opacity duration-200 disabled:opacity-40"
          style={{
            background: `linear-gradient(135deg, rgba(${CHATBOT_TINT},0.95), rgba(${CHATBOT_TINT},0.72))`,
            boxShadow: canSend ? `0 6px 18px -6px rgba(${CHATBOT_TINT},0.7)` : "none",
          }}
          aria-label="Send"
        >
          <Send className="h-3.5 w-3.5" />
        </motion.button>
      </div>
      <p className="mt-2 text-center text-[9.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground/35">
        Press enter · Esc to close
      </p>
    </form>
  );
}
