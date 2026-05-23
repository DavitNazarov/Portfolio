import { motion } from "framer-motion";
import {
  CHATBOT_EASE,
  CHATBOT_SUGGESTIONS,
  CHATBOT_TINT,
} from "@/features/chatbot/constants/chatbot";

export default function SuggestionChips({ onSend }) {
  return (
    <div className="relative px-5">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="h-px flex-1" style={{ backgroundColor: `rgba(${CHATBOT_TINT}, 0.15)` }} />
        <span
          className="text-[9px] font-mono uppercase tracking-[0.32em]"
          style={{ color: `rgba(${CHATBOT_TINT}, 0.55)` }}
        >
          Suggested
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: `rgba(${CHATBOT_TINT}, 0.15)` }} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CHATBOT_SUGGESTIONS.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            type="button"
            onClick={() => onSend(suggestion)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.04, ease: CHATBOT_EASE }}
            className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] text-foreground/85 transition-colors duration-200 cursor-default"
            style={{
              borderColor: `rgba(${CHATBOT_TINT}, 0.22)`,
              backgroundColor: `rgba(${CHATBOT_TINT}, 0.08)`,
            }}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
