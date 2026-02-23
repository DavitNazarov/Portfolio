import { Request, Response } from "express";
import { Experience } from "../model/Experience.model.js";
import { IExperience } from "../types/ExperienceTypes.js";
import { isDbConnectionError } from "../lib/dbError.js";
import * as r from "../lib/response.js";

const REQUIRED = ["role", "company", "period", "description", "tech"] as const;

function hasAll(body: Record<string, unknown>): body is Record<(typeof REQUIRED)[number], unknown> {
  return REQUIRED.every((k) => body[k] != null && (Array.isArray(body[k]) ? (body[k] as unknown[]).length > 0 : true));
}

export async function createExperience(req: Request, res: Response) {
  try {
    if (!hasAll(req.body)) return r.badRequest(res, "All fields are required");
    const { role, company, period, description, tech } = req.body;
    await Experience.create({ role, company, period, description, tech });
    return r.sendSuccess(res, 201, `Experience: "${role}" at "${company}", created successfully`);
  } catch (error) {
    console.error("Error creating experience", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function getAllExperience(req: Request, res: Response) {
  try {
    const experiences = await Experience.find();
    return r.sendSuccess(res, 200, "Experiences fetched successfully", { experiences });
  } catch (error) {
    console.error("Error fetching experiences", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function updateExperience(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Experience ID is required");

    const updateData: Partial<IExperience> = {};
    const { role, company, period, description, tech } = req.body;
    if (role !== undefined) updateData.role = role;
    if (company !== undefined) updateData.company = company;
    if (period !== undefined) updateData.period = period;
    if (description !== undefined) updateData.description = description;
    if (tech !== undefined) updateData.tech = tech;

    const experience = await Experience.findByIdAndUpdate(id, updateData, { new: true });
    if (!experience) return r.notFound(res, "Experience is not found");

    return r.sendSuccess(res, 200, `Experience: "${experience.role}" at "${experience.company}", updated successfully`);
  } catch (error) {
    console.error("Error updating experience", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function deleteExperience(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Experience ID is required");

    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) return r.notFound(res, "Experience is not found");

    return r.sendSuccess(res, 200, `Experience: "${experience.role}" at "${experience.company}", deleted successfully`);
  } catch (error) {
    console.error("Error deleting experience", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}
