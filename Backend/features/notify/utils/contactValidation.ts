import type { RequestBody } from "./requestMeta.js";
import { clipText } from "./requestMeta.js";

type ParsedContact =
  | {
      ok: true;
      data: {
        name: string;
        phone: string;
        email: string;
        comment: string;
      };
    }
  | { ok: false; message: string };

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requiredText(body: RequestBody, key: string, max: number) {
  return clipText(body[key], max) ?? "";
}

export function parseContactBody(body: RequestBody): ParsedContact {
  const name = requiredText(body, "name", 120);
  const phone = requiredText(body, "phone", 80);
  const email = requiredText(body, "email", 160).toLowerCase();
  const comment = requiredText(body, "comment", 2000);

  if (!name || !phone || !email || !comment) {
    return { ok: false, message: "Name, phone, email, and comment are required." };
  }
  if (!isEmail(email)) {
    return { ok: false, message: "Please provide a valid email address." };
  }

  return {
    ok: true,
    data: { name, phone, email, comment },
  };
}
