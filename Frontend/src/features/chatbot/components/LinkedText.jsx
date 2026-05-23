import { CHATBOT_TINT } from "@/features/chatbot/constants/chatbot";

const URL_RX = /(https?:\/\/[^\s]+)/g;

export default function LinkedText({ text }) {
  return text.split(URL_RX).map((part, index) => {
    if (part.startsWith("http://") || part.startsWith("https://")) {
      const href = part.replace(/[.,)]$/, "");
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/25 underline-offset-2 transition-colors duration-200 hover:decoration-white/80"
          style={{ color: `rgb(${CHATBOT_TINT})` }}
        >
          {href}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
