export type VisitorMeta = {
  ip?: string;
  userAgent?: string;
  referrer?: string;
  path?: string;
  country?: string;
  locale?: string;
};

export type ChatMeta = VisitorMeta & {
  message?: string;
};

export type ContactSubmission = VisitorMeta & {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

export type EmailOptions = {
  subject: string;
  html: string;
  text: string;
  to?: string[];
  replyTo?: string;
};

export type MailSendResult =
  | { skipped: true }
  | { ok: true; id?: string }
  | { ok: false; error: unknown };
