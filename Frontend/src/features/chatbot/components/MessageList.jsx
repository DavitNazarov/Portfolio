import { CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";
import MessageBubble from "@/features/chatbot/components/MessageBubble";
import TypingIndicator from "@/features/chatbot/components/TypingIndicator";

export default function MessageList({ messages, messagesRef, thinking }) {
  return (
    <div
      ref={messagesRef}
      className="chatbot-messages relative mt-4 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-5 py-2 pr-3"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: `rgba(${CHATBOT_TINT},0.35) transparent`,
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {messages.map((message, index) => (
        <MessageBubble key={`${index}-${message.sender}`} message={message} />
      ))}

      {thinking && <TypingIndicator />}
    </div>
  );
}
