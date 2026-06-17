import type { ContactSubmission, EmailOptions } from "../types.js";
import { escapeHtml, locationLine, metaRows, wrapShell } from "./shared.js";

type ContactEmails = {
  owner: EmailOptions;
  user: EmailOptions;
};

export function buildContactEmails(submission: ContactSubmission): ContactEmails {
  const accent = "#a78bfa";
  const contactRows = buildContactRows(submission);
  const comment = buildComment(submission.comment, accent);
  const metaTable = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #1f2027;border-radius:10px;background:#0f0f14;">${metaRows(submission)}</table>`;

  return {
    owner: {
      subject: `Portfolio contact · ${submission.name}`,
      html: wrapShell("New contact message", accent, contactRows + comment + metaTable),
      text: ownerText(submission),
      replyTo: submission.email,
    },
    user: {
      subject: "Copy of your message to Davit Nazarov",
      html: wrapShell(
        "Message received",
        accent,
        `<p style="margin:0 0 14px 0;color:#c9cbd1;font:400 14px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Hi ${escapeHtml(submission.name)}, thanks for reaching out. This is a copy of the message you sent through the portfolio contact form.</p>` +
          contactRows +
          comment
      ),
      text: userText(submission),
      to: [submission.email],
    },
  };
}

function buildContactRows(submission: ContactSubmission) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #1f2027;border-radius:10px;background:#0f0f14;margin:0 0 14px 0;">
    <tr><td style="padding:6px 12px;color:#9aa0a6;font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:nowrap;">Name</td><td style="padding:6px 12px;color:#e7e9ee;font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${escapeHtml(submission.name)}</td></tr>
    <tr><td style="padding:6px 12px;color:#9aa0a6;font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:nowrap;">Phone</td><td style="padding:6px 12px;color:#e7e9ee;font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${escapeHtml(submission.phone)}</td></tr>
    <tr><td style="padding:6px 12px;color:#9aa0a6;font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:nowrap;">Email</td><td style="padding:6px 12px;color:#e7e9ee;font:400 13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;word-break:break-word;">${escapeHtml(submission.email)}</td></tr>
  </table>`;
}

function buildComment(comment: string, accent: string) {
  return `<blockquote style="margin:0 0 14px 0;padding:12px 14px;border-left:3px solid ${accent};background:#0f0f14;border-radius:6px;color:#e7e9ee;font:400 14px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:pre-wrap;">${escapeHtml(comment)}</blockquote>`;
}

function ownerText(submission: ContactSubmission) {
  return [
    "New portfolio contact message.",
    "",
    `Name: ${submission.name}`,
    `Phone: ${submission.phone}`,
    `Email: ${submission.email}`,
    "",
    submission.comment,
    "",
    `When: ${new Date().toISOString()}`,
    locationLine(submission) && `Location: ${locationLine(submission)}`,
    submission.coordinates && `Coordinates: ${submission.coordinates}`,
    submission.ip && `IP: ${submission.ip}`,
    submission.path && `Path: ${submission.path}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function userText(submission: ContactSubmission) {
  return [
    `Hi ${submission.name}, thanks for reaching out.`,
    "This is a copy of the message you sent through the portfolio contact form.",
    "",
    `Name: ${submission.name}`,
    `Phone: ${submission.phone}`,
    `Email: ${submission.email}`,
    "",
    submission.comment,
  ].join("\n");
}
