import type { Request, Response } from "express";
import { isMailerConfigured, sendVisitNotification } from "../../../lib/mailer.js";
import * as r from "../../../lib/response.js";
import { isFailedMailResult, isSkippedMailResult } from "../utils/mailerResult.js";
import { requestBody, visitorMetaWithGeo } from "../utils/requestMeta.js";

export async function visitHandler(req: Request, res: Response) {
  if (!isMailerConfigured()) {
    return r.sendSuccess(res, 200, "Mailer not configured; visit ignored.");
  }

  const result = await sendVisitNotification(await visitorMetaWithGeo(req, requestBody(req)));

  if (isSkippedMailResult(result)) {
    return r.sendSuccess(res, 200, "Mailer skipped");
  }
  if (isFailedMailResult(result)) {
    return r.serverError(res, "Failed to send notification");
  }

  return r.sendSuccess(res, 200, "Notification sent");
}
