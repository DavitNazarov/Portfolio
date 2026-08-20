import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import ChatBotLauncher from "@/features/chatbot/components/ChatBotLauncher";
import { useChatBot } from "@/features/chatbot/hooks/useChatBot";

// Only the launcher is on screen until someone opens the chat, so the panel and
// its message rendering stay out of the entry chunk.
const ChatBotPanel = lazy(() => import("@/features/chatbot/components/ChatBotPanel"));

export default function ChatBotWidget() {
  const chat = useChatBot();

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <div className="relative flex flex-col items-end">
        <AnimatePresence>
          {chat.open && (
            <Suspense fallback={null}>
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
            </Suspense>
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
