import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiPublic } from "@/lib/api";
import { trackChatMessage, trackChatOpen } from "@/lib/notify";
import { ASSISTANT_NAME, CHATBOT_FALLBACKS } from "@/features/chatbot/constants/chatbot";
import { findBestAnswer } from "@/features/chatbot/utils/answerEngine";
import { toAiHistory } from "@/features/chatbot/utils/aiHistory";

export function useChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [greeted, setGreeted] = useState(false);

  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const latestMessagesRef = useRef(messages);

  const greeting = useMemo(
    () =>
      `Hey — I'm ${ASSISTANT_NAME}, Davit's AI portfolio helper. I read the live portfolio data before answering, so ask me anything about his work, stack, or projects.`,
    []
  );

  useEffect(() => {
    latestMessagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event) => {
      if (panelRef.current?.contains(event.target)) return;
      if (triggerRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open && !greeted) {
      setMessages([{ sender: "bot", text: greeting }]);
      setGreeted(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, greeted, greeting]);

  useEffect(() => {
    if (open) trackChatOpen();
  }, [open]);

  useEffect(() => {
    const scroller = messagesRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const scroller = messagesRef.current;
    if (!panel) return;

    const scrollMessages = (deltaY) => {
      if (!scroller) return false;
      if (scroller.scrollHeight <= scroller.clientHeight) return false;
      scroller.scrollTop = Math.max(
        0,
        Math.min(scroller.scrollTop + deltaY, scroller.scrollHeight - scroller.clientHeight)
      );
      return true;
    };

    const onWheel = (event) => {
      if (!panel.contains(event.target)) return;
      scrollMessages(event.deltaY);
      event.preventDefault();
      event.stopPropagation();
    };

    let lastTouchY = 0;
    const onTouchStart = (event) => {
      lastTouchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event) => {
      const y = event.touches[0]?.clientY ?? 0;
      const deltaY = lastTouchY - y;
      lastTouchY = y;
      if (!panel.contains(event.target)) return;
      scrollMessages(deltaY);
      event.preventDefault();
      event.stopPropagation();
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    panel.addEventListener("touchstart", onTouchStart, { passive: true });
    panel.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      panel.removeEventListener("wheel", onWheel);
      panel.removeEventListener("touchstart", onTouchStart);
      panel.removeEventListener("touchmove", onTouchMove);
    };
  }, [open]);

  const send = useCallback(async (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setInput("");
    const history = latestMessagesRef.current;
    setMessages((current) => [...current, { sender: "user", text: trimmed }]);
    setThinking(true);
    trackChatMessage(trimmed);

    try {
      const response = await apiPublic("/api/ai/chat", {
        method: "POST",
        body: {
          message: trimmed,
          history: toAiHistory(history),
        },
      });
      const answer = response.answer?.trim() || "I had the thought, then dropped it. Try me again?";
      setMessages((current) => [...current, { sender: "bot", text: answer }]);
    } catch (error) {
      const fallback = findBestAnswer(trimmed) ?? CHATBOT_FALLBACKS[0];
      console.warn("Atlas AI fallback used:", error.message);
      setMessages((current) => [...current, { sender: "bot", text: fallback }]);
    } finally {
      setThinking(false);
    }
  }, []);

  const reset = useCallback(() => {
    setThinking(false);
    setMessages([{ sender: "bot", text: greeting }]);
  }, [greeting]);

  return {
    greeted,
    input,
    inputRef,
    messages,
    messagesRef,
    open,
    panelRef,
    reset,
    send,
    setInput,
    setOpen,
    thinking,
    triggerRef,
  };
}
