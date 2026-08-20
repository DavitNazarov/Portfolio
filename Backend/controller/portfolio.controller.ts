import type { Request, Response } from "express";
import { Award } from "../model/Award.model.js";
import { Education } from "../model/education.model.js";
import { Experience } from "../model/Experience.model.js";
import { Projects } from "../model/Projects.model.js";
import { handleControllerError } from "../lib/controller.js";
import { latestPeriodYear, sortByPeriodStatus } from "../lib/period.js";
import * as r from "../lib/response.js";

/**
 * Everything the public site renders, in one request.
 *
 * The landing page previously fetched experience, education, projects and
 * awards from `useHomeData`, and then the Experience/Education/Projects
 * sections each fetched their own endpoint again — seven requests for four
 * collections, each with its own loading state, so sections settled at
 * different moments. Ordering is applied here so every consumer agrees on it.
 */
export async function getPublicPortfolio(_req: Request, res: Response) {
  try {
    const [projects, experiences, education, awards] = await Promise.all([
      Projects.find().lean(),
      Experience.find().lean(),
      Education.find().lean(),
      Award.find().lean(),
    ]);

    return r.sendSuccess(res, 200, "Portfolio fetched successfully", {
      projects: [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
      experiences: sortByPeriodStatus(experiences),
      education: sortByPeriodStatus(education),
      awards: [...awards].sort((a, b) => latestPeriodYear(b.period) - latestPeriodYear(a.period)),
    });
  } catch (error) {
    return handleControllerError(res, error, "Error fetching portfolio");
  }
}
