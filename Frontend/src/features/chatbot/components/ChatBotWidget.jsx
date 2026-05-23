import { AnimatePresence } from "framer-motion";
import ChatBotLauncher from "@/features/chatbot/components/ChatBotLauncher";
import ChatBotPanel from "@/features/chatbot/components/ChatBotPanel";
import { useChatBot } from "@/features/chatbot/hooks/useChatBot";

export default function ChatBotWidget() {
  const chat = useChatBot();

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <div className="relative flex flex-col items-end">
        <AnimatePresence>
          {chat.open && (
            <ChatBotPanel
              input={chat.input}
              inputRef={chat.inputRef}
              messages={chat.messages}
              messagesRef={chat.messagesRef}
              onClose={() => chat.setOpen(false)}
              onInputChange={chat.setInput}
              onReset={chat.reset}
              onSend={chat.send}
              panelRef={chat.panelRef}
              thinking={chat.thinking}
            />
          )}
        </AnimatePresence>

        <ChatBotLauncher
          greeted={chat.greeted}
          onToggle={() => chat.setOpen((open) => !open)}
          open={chat.open}
          triggerRef={chat.triggerRef}
        />
      </div>
    </div>
  );
}
