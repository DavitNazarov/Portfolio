import type { Request, Response } from "express";
import { isMailerConfigured, sendChatNotification } from "../../../lib/mailer.js";
import * as r from "../../../lib/response.js";
import { isFailedMailResult, isSkippedMailResult } from "../utils/mailerResult.js";
import { clipText, requestBody, visitorMetaWithGeo } from "../utils/requestMeta.js";

export async function chatEventHandler(req: Request, res: Response) {
  if (!isMailerConfigured()) {
    return r.sendSuccess(res, 200, "Mailer not configured; chat event ignored.");
  }

  const body = requestBody(req);
  const result = await sendChatNotification({
    ...(await visitorMetaWithGeo(req, body)),
    message: clipText(body.message, 600),
  });

  if (isSkippedMailResult(result)) {
    return r.sendSuccess(res, 200, "Mailer skipped");
  }
  if (isFailedMailResult(result)) {
    return r.serverError(res, "Failed to send notification");
  }

  return r.sendSuccess(res, 200, "Notification sent");
}
