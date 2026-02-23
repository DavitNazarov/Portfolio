import { Request, Response } from "express";
import { Education } from "../model/education.model.js";
import { IEducation } from "../types/educationTypes.js";
import { isDbConnectionError } from "../lib/dbError.js";
import * as r from "../lib/response.js";

const REQUIRED = ["degree", "institution", "period", "description", "present"] as const;

function hasAll(body: Record<string, unknown>): body is Record<(typeof REQUIRED)[number], unknown> {
  return REQUIRED.every((k) => body[k] != null);
}

export async function getAllEducation(req: Request, res: Response) {
  try {
    const education = await Education.find();
    return r.sendSuccess(res, 200, "Education fetched successfully", { education });
  } catch (error) {
    console.error("Error fetching education", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function createEducation(req: Request, res: Response) {
  try {
    if (!hasAll(req.body)) return r.badRequest(res, "All fields are required");
    const { degree, institution, period, description, present } = req.body;

    const existing = await Education.findOne({ degree, institution, period });
    if (existing) return r.badRequest(res, `Education: ${degree} at ${institution}, already exists`);

    await Education.create({ degree, institution, period, description, present });
    return r.sendSuccess(res, 201, `Education: ${degree} at ${institution}, created successfully`);
  } catch (error) {
    console.error("Error creating education", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function updateEducation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Education ID is required");
    if (!hasAll(req.body)) return r.badRequest(res, "All fields are required");

    const { degree, institution, period, description, present } = req.body;
    const updateData: Partial<IEducation> = {};
    if (degree != null) updateData.degree = String(degree);
    if (institution != null) updateData.institution = String(institution);
    if (period != null) updateData.period = String(period);
    if (description != null) updateData.description = String(description);
    if (present != null) updateData.present = Boolean(present);

    const education = await Education.findByIdAndUpdate(id, updateData, { new: true });
    if (!education) return r.notFound(res, "Education is not found");

    return r.sendSuccess(res, 200, `Education: ${degree} at ${institution}, updated successfully`);
  } catch (error) {
    console.error("Error updating education", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function deleteEducation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Education ID is required");

    const education = await Education.findByIdAndDelete(id);
    if (!education) return r.notFound(res, "Education is not found");

    return r.sendSuccess(res, 200, `Education: ${education.degree} at ${education.institution}, deleted successfully`);
  } catch (error) {
    console.error("Error deleting education", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}
