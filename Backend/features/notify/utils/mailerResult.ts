type SkippedMailResult = { skipped: true };
type FailedMailResult = { ok: false; error?: unknown };

export function isSkippedMailResult(result: unknown): result is SkippedMailResult {
  return Boolean(result && typeof result === "object" && "skipped" in result && result.skipped);
}

export function isFailedMailResult(result: unknown): result is FailedMailResult {
  return Boolean(result && typeof result === "object" && "ok" in result && !result.ok);
}

export function mailerErrorMessage(result: unknown) {
  if (!result || typeof result !== "object" || !("error" in result)) {
    return "Failed to send contact message. Please try again later.";
  }

  const error = (result as { error?: unknown }).error;
  if (typeof error === "string") {
    return friendlyResendError(error);
  }
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return friendlyResendError(message);
    }
  }

  return "Failed to send contact message. Please try again later.";
}

function friendlyResendError(message: string) {
  if (message.toLowerCase().includes("only send testing emails")) {
    return "This portfolio sends email through Resend. Until the sending domain is verified, Resend can only deliver messages to the verified owner email: nazarov.davit17@gmail.com.";
  }

  return message;
}
