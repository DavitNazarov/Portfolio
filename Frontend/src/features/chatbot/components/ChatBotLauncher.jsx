import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { CHATBOT_EASE, CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";

export default function ChatBotLauncher({ greeted, onToggle, open, triggerRef }) {
  return (
    <motion.button
      ref={triggerRef}
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative flex h-14 w-14 items-center justify-center rounded-full border text-white shadow-xl transition-shadow duration-200"
      style={{
        borderColor: `rgba(${CHATBOT_TINT}, 0.35)`,
        background: `linear-gradient(135deg, rgba(${CHATBOT_TINT},0.9) 0%, rgba(${CHATBOT_TINT},0.6) 60%, rgba(20,20,24,0.92) 120%)`,
        boxShadow: `0 10px 32px -8px rgba(${CHATBOT_TINT},0.55)`,
      }}
      aria-label={open ? "Close Davit's portfolio guide" : "Open Davit's portfolio guide"}
    >
      {!open && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid rgba(${CHATBOT_TINT}, 0.5)` }}
          animate={{ scale: [1, 1.25, 1.25], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.28, ease: CHATBOT_EASE }}>
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </motion.div>

      {!open && !greeted && (
        <motion.span
          aria-hidden
          className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: "spring", stiffness: 400, damping: 20 }}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
        </motion.span>
      )}
    </motion.button>
  );
}
