import { motion } from "framer-motion";
import { CHATBOT_EASE, CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";
import ChatBotHeader from "@/features/chatbot/components/ChatBotHeader";
import ChatInput from "@/features/chatbot/components/ChatInput";
import MessageList from "@/features/chatbot/components/MessageList";
import SuggestionChips from "@/features/chatbot/components/SuggestionChips";

export default function ChatBotPanel({
  input,
  inputRef,
  messages,
  messagesRef,
  onClose,
  onInputChange,
  onReset,
  onSend,
  panelRef,
  thinking,
}) {
  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.24, ease: CHATBOT_EASE }}
      className="mb-4 relative flex h-[min(82dvh,44rem)] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-[1.6rem] border backdrop-blur-xl shadow-2xl sm:h-[min(86dvh,46rem)] sm:w-[26rem]"
      style={{
        borderColor: `rgba(${CHATBOT_TINT}, 0.2)`,
        background: `linear-gradient(155deg, rgba(${CHATBOT_TINT}, 0.08) 0%, rgba(20,20,24,0.92) 45%, rgba(8,8,10,0.96) 100%)`,
      }}
      role="dialog"
      aria-label="Davit's portfolio guide"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${CHATBOT_TINT}, 0.6), transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-50 blur-3xl"
        style={{ background: `rgba(${CHATBOT_TINT}, 0.25)` }}
      />

      <ChatBotHeader messagesCount={messages.length} onClose={onClose} onReset={onReset} />
      <SuggestionChips onSend={onSend} />
      <MessageList messages={messages} messagesRef={messagesRef} thinking={thinking} />
      <ChatInput
        input={input}
        inputRef={inputRef}
        onInputChange={onInputChange}
        onSend={onSend}
        thinking={thinking}
      />
    </motion.div>
  );
}
