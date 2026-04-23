import { Resend } from "resend";
import { config } from "../config.js";

/* ─────────────────────────────────────────────────────────────
 *  Resend mailer — singleton
 * ──────────────────────────────────────────────────────────── */

let client: Resend | null = null;
let warned = false;

function getClient(): Resend | null {
  if (!config.resendApiKey) {
    if (!warned) {
      console.warn("RESEND_API_KEY is not set — skipping outbound emails.");
      warned = true;
    }
    return null;
  }
  if (!client) client = new Resend(config.resendApiKey);
  return client;
}

export type VisitorMeta = {
  ip?: string;
  userAgent?: string;
  referrer?: string;
  path?: string;
  country?: string;
  locale?: string;
};

function escapeHtml(value: string) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function metaRows(meta: VisitorMeta) {
  const rows: Array<[string, string | undefined]> = [
    ["When", new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC"],
    ["IP", meta.ip],
    ["User-Agent", meta.userAgent],
    ["Referrer", meta.referrer],
    ["Path", meta.path],
    ["Country", meta.country],
    ["Locale", meta.locale],
  ];
  return rows
    .filter(([, v]) => v && v.length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#9aa0a6;font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;vertical-align:top;white-space:nowrap;">${k}</td><td style="padding:6px 12px;color:#e7e9ee;font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;word-break:break-word;">${escapeHtml(v as string)}</td></tr>`
    )
    .join("");
}

function wrapShell(title: string, accent: string, bodyHtml: string) {
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#0b0b0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#111115;border:1px solid #1f2027;border-radius:16px;overflow:hidden;">
    <tr><td style="padding:22px 24px 6px 24px;">
      <div style="display:inline-block;padding:4px 10px;border-radius:999px;background:${accent}1f;color:${accent};font:600 10px/1 'SF Mono',ui-monospace,Menlo,monospace;letter-spacing:0.2em;text-transform:uppercase;">Portfolio</div>
      <h1 style="margin:14px 0 4px 0;color:#f4f5f8;font:600 22px/1.25 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${escapeHtml(title)}</h1>
    </td></tr>
    <tr><td style="padding:4px 24px 20px 24px;">
      ${bodyHtml}
    </td></tr>
    <tr><td style="padding:14px 24px 22px 24px;border-top:1px solid #1f2027;">
      <p style="margin:0;color:#6b7280;font:400 11px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Sent automatically from your portfolio backend.</p>
    </td></tr>
  </table>
</body></html>`;
}

async function send(options: { subject: string; html: string; text: string }) {
  const resend = getClient();
  if (!resend) return { skipped: true as const };

  try {
    const result = await resend.emails.send({
      from: config.notifyFrom,
      to: [config.notifyEmail],
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    if (result.error) {
      console.error("Resend send error:", result.error);
      return { ok: false as const, error: result.error };
    }
    return { ok: true as const, id: result.data?.id };
  } catch (err) {
    console.error("Resend threw:", (err as Error).message);
    return { ok: false as const, error: (err as Error).message };
  }
}

export async function sendVisitNotification(meta: VisitorMeta) {
  const accent = "#a78bfa";
  const subject = "Portfolio visit · someone just opened your site";
  const table = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #1f2027;border-radius:10px;background:#0f0f14;">${metaRows(meta)}</table>`;
  const intro = `<p style="margin:0 0 14px 0;color:#c9cbd1;font:400 14px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Someone just opened your portfolio. Details below:</p>`;
  const html = wrapShell("New visit", accent, intro + table);
  const text = [
    "Someone just opened your portfolio.",
    "",
    `When: ${new Date().toISOString()}`,
    meta.ip && `IP: ${meta.ip}`,
    meta.userAgent && `User-Agent: ${meta.userAgent}`,
    meta.referrer && `Referrer: ${meta.referrer}`,
    meta.path && `Path: ${meta.path}`,
    meta.locale && `Locale: ${meta.locale}`,
  ]
    .filter(Boolean)
    .join("\n");

  return send({ subject, html, text });
}

export type ChatMeta = VisitorMeta & {
  message?: string;
};

export async function sendChatNotification(meta: ChatMeta) {
  const accent = "#34d399";
  const subject = meta.message
    ? "Portfolio chat · someone asked Atlas a question"
    : "Portfolio chat · someone opened the chat";
  const preview = meta.message
    ? `<blockquote style="margin:0 0 14px 0;padding:12px 14px;border-left:3px solid ${accent};background:#0f0f14;border-radius:6px;color:#e7e9ee;font:400 14px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${escapeHtml(meta.message)}</blockquote>`
    : `<p style="margin:0 0 14px 0;color:#c9cbd1;font:400 14px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">A visitor opened the Atlas chat widget. No message sent yet.</p>`;
  const table = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #1f2027;border-radius:10px;background:#0f0f14;">${metaRows(meta)}</table>`;
  const html = wrapShell(meta.message ? "Chat question" : "Chat opened", accent, preview + table);
  const text = [
    meta.message ? "Someone asked Atlas:" : "Someone opened the chat widget.",
    meta.message ? `\n> ${meta.message}\n` : "",
    `When: ${new Date().toISOString()}`,
    meta.ip && `IP: ${meta.ip}`,
    meta.userAgent && `User-Agent: ${meta.userAgent}`,
    meta.referrer && `Referrer: ${meta.referrer}`,
    meta.path && `Path: ${meta.path}`,
  ]
    .filter(Boolean)
    .join("\n");

  return send({ subject, html, text });
}

export function isMailerConfigured() {
  return Boolean(config.resendApiKey);
}
