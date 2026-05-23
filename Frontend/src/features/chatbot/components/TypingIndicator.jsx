import { motion } from "framer-motion";
import { CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-start"
    >
      <div
        className="flex items-center gap-1.5 rounded-2xl border px-3.5 py-2.5"
        style={{
          borderColor: `rgba(${CHATBOT_TINT}, 0.14)`,
          backgroundColor: "rgba(255,255,255,0.03)",
        }}
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: `rgba(${CHATBOT_TINT}, 0.75)` }}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
