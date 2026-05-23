export function toAiHistory(items) {
  return items
    .filter((item) => item.sender === "user" || item.sender === "bot")
    .slice(-8)
    .map((item) => ({
      role: item.sender === "user" ? "user" : "assistant",
      content: item.text,
    }));
}
