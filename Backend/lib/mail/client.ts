import { Resend } from "resend";
import { config } from "../../config.js";
import type { EmailOptions, MailSendResult } from "./types.js";

let client: Resend | null = null;
let warned = false;

function getClient(): Resend | null {
  if (!config.resendApiKey) {
    if (!warned) {
      console.warn("RESEND_API_KEY is not set - skipping outbound emails.");
      warned = true;
    }
    return null;
  }

  client ??= new Resend(config.resendApiKey);
  return client;
}

export async function sendMail(options: EmailOptions): Promise<MailSendResult> {
  const resend = getClient();
  if (!resend) return { skipped: true };

  try {
    const result = await resend.emails.send({
      from: config.notifyFrom,
      to: options.to ?? [config.notifyEmail],
      ...(options.replyTo ? { replyTo: options.replyTo } : {}),
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (result.error) {
      console.error("Resend send error:", result.error);
      return { ok: false, error: result.error };
    }

    return { ok: true, id: result.data?.id };
  } catch (err) {
    console.error("Resend threw:", (err as Error).message);
    return { ok: false, error: (err as Error).message };
  }
}

export function isMailerConfigured() {
  return Boolean(config.resendApiKey);
}
