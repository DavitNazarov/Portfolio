import { Request, Response } from "express";
import { Award } from "../model/Award.model.js";
import { IAward } from "../types/AwardTypes.js";
import { isDbConnectionError } from "../lib/dbError.js";
import * as r from "../lib/response.js";

const REQUIRED = ["title", "medals", "category"] as const;

type AwardBody = Record<(typeof REQUIRED)[number], unknown> & {
  period?: unknown;
};

function hasAll(body: Record<string, unknown>): body is AwardBody {
  return REQUIRED.every((k) => body[k] != null && (Array.isArray(body[k]) ? (body[k] as unknown[]).length > 0 : true));
}

export async function createAward(req: Request, res: Response) {
  try {
    if (!hasAll(req.body)) return r.badRequest(res, "title, medals, and category are required");
    const { title, medals, category, period } = req.body;
    await Award.create({ title, medals, category, period: period ?? "" });
    return r.sendSuccess(res, 201, `Award: "${title}" created successfully`);
  } catch (error) {
    console.error("Error creating award", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function getAllAwards(req: Request, res: Response) {
  try {
    const awards = await Award.find();
    return r.sendSuccess(res, 200, "Awards fetched successfully", { awards });
  } catch (error) {
    console.error("Error fetching awards", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function updateAward(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Award ID is required");

    const updateData: Partial<IAward> = {};
    const { title, medals, category, period } = req.body;
    if (title !== undefined) updateData.title = title;
    if (medals !== undefined) updateData.medals = medals;
    if (category !== undefined) updateData.category = category;
    if (period !== undefined) updateData.period = period;

    const award = await Award.findByIdAndUpdate(id, updateData, { new: true });
    if (!award) return r.notFound(res, "Award not found");

    return r.sendSuccess(res, 200, `Award: "${award.title}" updated successfully`);
  } catch (error) {
    console.error("Error updating award", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function deleteAward(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Award ID is required");

    const award = await Award.findByIdAndDelete(id);
    if (!award) return r.notFound(res, "Award not found");

    return r.sendSuccess(res, 200, `Award: "${award.title}" deleted successfully`);
  } catch (error) {
    console.error("Error deleting award", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}
