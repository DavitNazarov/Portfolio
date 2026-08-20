import { motion } from "framer-motion";
import { RotateCcw, Sparkles, X } from "lucide-react";
import { ASSISTANT_NAME, CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";

export default function ChatBotHeader({ messagesCount, onClose, onReset }) {
  return (
    <div className="relative flex items-start justify-between gap-3 px-5 pt-5 pb-4">
      <div className="flex items-start gap-3 min-w-0">
        <div className="relative shrink-0">
          <div
            aria-hidden
            className="absolute inset-0 rounded-xl blur-lg opacity-70"
            style={{ background: `rgba(${CHATBOT_TINT}, 0.45)` }}
          />
          <div
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border"
            style={{
              borderColor: `rgba(${CHATBOT_TINT}, 0.32)`,
              backgroundColor: `rgba(${CHATBOT_TINT}, 0.15)`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: `rgb(${CHATBOT_TINT})` }} />
          </div>
        </div>

        <div className="min-w-0">
          <p
            className="text-[9.5px] font-mono uppercase tracking-[0.32em] leading-none"
            style={{ color: `rgba(${CHATBOT_TINT}, 0.8)` }}
          >
            Portfolio · Helper
          </p>
          <h3 className="mt-1.5 text-lg sm:text-xl font-light tracking-tight text-foreground leading-none">
            Ask <span className="font-serif italic font-normal text-white">{ASSISTANT_NAME}</span>
          </h3>
          <p className="mt-1.5 text-[11.5px] text-ink-1 leading-snug">
            OpenRouter-powered, using live portfolio data.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {messagesCount > 1 && (
          <motion.button
            type="button"
            onClick={onReset}
            whileHover={{ scale: 1.08, rotate: -18 }}
            whileTap={{ scale: 0.92 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-1 transition-colors duration-200 hover:text-foreground hover:border-white/20"
            aria-label="Clear conversation"
            title="Clear"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </motion.button>
        )}
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-1 transition-colors duration-200 hover:text-foreground hover:border-white/20"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
