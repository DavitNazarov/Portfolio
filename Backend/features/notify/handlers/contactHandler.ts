import type { Request, Response } from "express";
import { isMailerConfigured, sendContactSubmission } from "../../../lib/mailer.js";
import * as r from "../../../lib/response.js";
import { parseContactBody } from "../utils/contactValidation.js";
import { isFailedMailResult, isSkippedMailResult, mailerErrorMessage } from "../utils/mailerResult.js";
import { requestBody, visitorMetaWithGeo } from "../utils/requestMeta.js";

export async function contactHandler(req: Request, res: Response) {
  if (!isMailerConfigured()) {
    return r.sendError(res, 503, "Contact form is temporarily unavailable. Mailer is not configured.");
  }

  const body = requestBody(req);
  const parsed = parseContactBody(body);
  if (!parsed.ok) return r.badRequest(res, parsed.message);

  const result = await sendContactSubmission({
    ...(await visitorMetaWithGeo(req, body)),
    ...parsed.data,
  });

  if (isSkippedMailResult(result)) {
    return r.sendError(res, 503, "Contact form is temporarily unavailable. Mailer is not configured.");
  }
  if (isFailedMailResult(result)) {
    return r.serverError(res, mailerErrorMessage(result));
  }

  return r.sendSuccess(res, 200, "Message sent. A copy was sent to your email.");
}
