import type { Request, Response } from "express";
import {
  bodyRecord,
  handleControllerError,
  hasRequiredFields,
  pickDefined,
  requestId,
} from "../lib/controller.js";
import { IExperience } from "../types/ExperienceTypes.js";
import { Experience } from "../model/Experience.model.js";
import * as r from "../lib/response.js";

const REQUIRED = ["role", "company", "period", "description", "tech"] as const;
type ExperienceUpdate = Pick<IExperience, (typeof REQUIRED)[number]>;

export async function createExperience(req: Request, res: Response) {
  try {
    const body = bodyRecord(req);
    if (!hasRequiredFields(body, REQUIRED)) return r.badRequest(res, "All fields are required");
    const { role, company, period, description, tech } = body;

    await Experience.create({ role, company, period, description, tech });
    return r.sendSuccess(res, 201, `Experience: "${role}" at "${company}", created successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error creating experience");
  }
}

export async function getAllExperience(req: Request, res: Response) {
  try {
    const experiences = await Experience.find();
    return r.sendSuccess(res, 200, "Experiences fetched successfully", { experiences });
  } catch (error) {
    return handleControllerError(res, error, "Error fetching experiences");
  }
}

export async function updateExperience(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Experience");
    if (!id) return;

    const updateData = pickDefined<ExperienceUpdate>(bodyRecord(req), REQUIRED);
    const experience = await Experience.findByIdAndUpdate(id, updateData, { new: true });
    if (!experience) return r.notFound(res, "Experience is not found");

    return r.sendSuccess(res, 200, `Experience: "${experience.role}" at "${experience.company}", updated successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error updating experience");
  }
}

export async function deleteExperience(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Experience");
    if (!id) return;

    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) return r.notFound(res, "Experience is not found");

    return r.sendSuccess(res, 200, `Experience: "${experience.role}" at "${experience.company}", deleted successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error deleting experience");
  }
}
