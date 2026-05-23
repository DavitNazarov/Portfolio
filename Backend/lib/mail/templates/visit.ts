import type { EmailOptions, VisitorMeta } from "../types.js";
import { metaRows, wrapShell } from "./shared.js";

export function buildVisitEmail(meta: VisitorMeta): EmailOptions {
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

  return { subject, html, text };
}
