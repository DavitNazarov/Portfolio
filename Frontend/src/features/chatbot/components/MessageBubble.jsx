import { motion } from "framer-motion";
import { CHATBOT_EASE, CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";
import LinkedText from "@/features/chatbot/components/LinkedText";

export default function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24, ease: CHATBOT_EASE }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isUser ? "text-white" : "text-foreground/92 border"
        }`}
        style={
          isUser
            ? {
                background: `linear-gradient(135deg, rgba(${CHATBOT_TINT},0.85), rgba(${CHATBOT_TINT},0.65))`,
                boxShadow: `0 8px 24px -8px rgba(${CHATBOT_TINT},0.55)`,
              }
            : {
                borderColor: `rgba(${CHATBOT_TINT}, 0.14)`,
                backgroundColor: "rgba(255,255,255,0.03)",
              }
        }
      >
        {isUser ? message.text : <LinkedText text={message.text} />}
      </div>
    </motion.div>
  );
}
