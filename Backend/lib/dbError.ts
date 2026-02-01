export function isDbConnectionError(err: unknown): boolean {
  const name = err instanceof Error ? err.name : "";
  const msg = err instanceof Error ? err.message : String(err);
  return (
    name === "MongoServerSelectionError" ||
    name === "MongoNetworkError" ||
    msg.includes("buffering timed out") ||
    msg.includes("connection")
  );
}
