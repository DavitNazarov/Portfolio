import { isMailerConfigured, sendMail } from "./mail/client.js";
import { buildChatEmail } from "./mail/templates/chat.js";
import { buildContactEmails } from "./mail/templates/contact.js";
import { buildVisitEmail } from "./mail/templates/visit.js";
import type { ChatMeta, ContactSubmission, VisitorMeta } from "./mail/types.js";

export type { ChatMeta, ContactSubmission, VisitorMeta } from "./mail/types.js";
export { isMailerConfigured };

export function sendVisitNotification(meta: VisitorMeta) {
  return sendMail(buildVisitEmail(meta));
}

export function sendChatNotification(meta: ChatMeta) {
  return sendMail(buildChatEmail(meta));
}

export async function sendContactSubmission(submission: ContactSubmission) {
  const emails = buildContactEmails(submission);

  // The owner notification is the delivery that actually matters, so it alone
  // decides whether the submission succeeded.
  const owner = await sendMail(emails.owner);
  if ("skipped" in owner || ("ok" in owner && !owner.ok)) return owner;

  // The sender's courtesy copy is best-effort. It fails routinely while the
  // Resend sending domain is unverified (Resend will then only deliver to the
  // verified owner address). Failing the whole request on that told the visitor
  // the message was lost when the owner had already received it, and every
  // retry mailed the owner another duplicate.
  const copy = await sendMail(emails.user);
  const copySent = "ok" in copy && copy.ok;
  if (!copySent) {
    console.warn(
      "Contact copy to sender not delivered:",
      "error" in copy ? copy.error : "mailer skipped"
    );
  }

  return { ok: true as const, copySent };
}
