import type { VisitorMeta } from "../types.js";

export function escapeHtml(value: string) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Human-readable "City, Region, Country" from geo-enriched meta. */
export function locationLine(meta: VisitorMeta): string | undefined {
  const parts = [meta.city, meta.region, meta.country].filter(
    (part): part is string => Boolean(part)
  );
  return parts.length > 0 ? parts.join(", ") : undefined;
}

export function metaRows(meta: VisitorMeta) {
  const rows: Array<[string, string | undefined]> = [
    ["When", new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC"],
    ["Location", locationLine(meta)],
    ["Coordinates", meta.coordinates],
    ["Timezone", meta.timezone],
    ["Network", meta.org],
    ["IP", meta.ip],
    ["User-Agent", meta.userAgent],
    ["Referrer", meta.referrer],
    ["Path", meta.path],
    ["Locale", meta.locale],
  ];

  return rows
    .filter(([, value]) => value && value.length > 0)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px;color:#9aa0a6;font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;vertical-align:top;white-space:nowrap;">${key}</td><td style="padding:6px 12px;color:#e7e9ee;font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;word-break:break-word;">${escapeHtml(value as string)}</td></tr>`
    )
    .join("");
}

export function wrapShell(title: string, accent: string, bodyHtml: string) {
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
