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
  const owner = await sendMail(emails.owner);
  if ("skipped" in owner || ("ok" in owner && !owner.ok)) return owner;

  const user = await sendMail(emails.user);
  if ("skipped" in user || ("ok" in user && !user.ok)) return user;

  return { ok: true as const };
}
