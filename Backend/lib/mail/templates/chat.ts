import type { ChatMeta, EmailOptions } from "../types.js";
import { escapeHtml, metaRows, wrapShell } from "./shared.js";

export function buildChatEmail(meta: ChatMeta): EmailOptions {
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

  return { subject, html, text };
}
