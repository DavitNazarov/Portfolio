import type { Request, Response } from "express";
import {
  bodyRecord,
  handleControllerError,
  hasRequiredFields,
  pickDefined,
  requestId,
} from "../lib/controller.js";
import { periodIsCurrent } from "../lib/period.js";
import { IEducation } from "../types/educationTypes.js";
import { Education } from "../model/education.model.js";
import * as r from "../lib/response.js";

const REQUIRED = ["degree", "institution", "period", "description"] as const;
type EducationUpdate = Pick<IEducation, (typeof REQUIRED)[number] | "present">;

export async function getAllEducation(req: Request, res: Response) {
  try {
    const education = await Education.find();
    return r.sendSuccess(res, 200, "Education fetched successfully", { education });
  } catch (error) {
    return handleControllerError(res, error, "Error fetching education");
  }
}

export async function createEducation(req: Request, res: Response) {
  try {
    const body = bodyRecord(req);
    if (!hasRequiredFields(body, REQUIRED)) return r.badRequest(res, "All fields are required");
    const { degree, institution, period, description } = body;

    const existing = await Education.findOne({ degree, institution, period });
    if (existing) return r.badRequest(res, `Education: ${degree} at ${institution}, already exists`);

    await Education.create({ degree, institution, period, description, present: periodIsCurrent(period) });
    return r.sendSuccess(res, 201, `Education: ${degree} at ${institution}, created successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error creating education");
  }
}

export async function updateEducation(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Education");
    if (!id) return;

    const body = bodyRecord(req);
    if (!hasRequiredFields(body, REQUIRED)) return r.badRequest(res, "All fields are required");

    const updateData = pickDefined<EducationUpdate>(body, REQUIRED);
    updateData.degree = String(body.degree);
    updateData.institution = String(body.institution);
    updateData.period = String(body.period);
    updateData.description = String(body.description);
    updateData.present = periodIsCurrent(body.period);

    const education = await Education.findByIdAndUpdate(id, updateData, { new: true });
    if (!education) return r.notFound(res, "Education is not found");

    return r.sendSuccess(res, 200, `Education: ${education.degree} at ${education.institution}, updated successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error updating education");
  }
}

export async function deleteEducation(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Education");
    if (!id) return;

    const education = await Education.findByIdAndDelete(id);
    if (!education) return r.notFound(res, "Education is not found");

    return r.sendSuccess(res, 200, `Education: ${education.degree} at ${education.institution}, deleted successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error deleting education");
  }
}
