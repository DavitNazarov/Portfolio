/**
 * Driver/ODM errors that mean "the database is unreachable right now", which
 * callers surface as a 503 so the client retries.
 *
 * Matching is deliberately narrow. An earlier version also matched any message
 * containing "connection", which swept in unrelated application errors and
 * reported genuine 500s to clients as "Database not ready".
 */
const CONNECTION_ERROR_NAMES = new Set([
  "MongoServerSelectionError",
  "MongoNetworkError",
  "MongoNetworkTimeoutError",
  "MongoNotConnectedError",
  "MongoTimeoutError",
]);

export function isDbConnectionError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  if (CONNECTION_ERROR_NAMES.has(err.name)) return true;

  // Mongoose queues operations while disconnected and rejects them with this
  // specific message once the buffer timeout elapses.
  return err.message.includes("buffering timed out");
}
