import type { Request, Response } from "express";
import {
  bodyRecord,
  handleControllerError,
  hasRequiredFields,
  pickDefined,
  requestId,
} from "../lib/controller.js";
import { IAward } from "../types/AwardTypes.js";
import { Award } from "../model/Award.model.js";
import * as r from "../lib/response.js";

const REQUIRED = ["title", "medals", "category"] as const;
const UPDATE_FIELDS = ["title", "medals", "category", "period"] as const;
type AwardUpdate = Pick<IAward, (typeof UPDATE_FIELDS)[number]>;

export async function createAward(req: Request, res: Response) {
  try {
    const body = bodyRecord(req);
    if (!hasRequiredFields(body, REQUIRED)) return r.badRequest(res, "title, medals, and category are required");
    const { title, medals, category, period } = body;

    await Award.create({ title, medals, category, period: period ?? "" });
    return r.sendSuccess(res, 201, `Award: "${title}" created successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error creating award");
  }
}

export async function getAllAwards(req: Request, res: Response) {
  try {
    const awards = await Award.find();
    return r.sendSuccess(res, 200, "Awards fetched successfully", { awards });
  } catch (error) {
    return handleControllerError(res, error, "Error fetching awards");
  }
}

export async function updateAward(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Award");
    if (!id) return;

    const updateData = pickDefined<AwardUpdate>(bodyRecord(req), UPDATE_FIELDS);
    const award = await Award.findByIdAndUpdate(id, updateData, { new: true });
    if (!award) return r.notFound(res, "Award not found");

    return r.sendSuccess(res, 200, `Award: "${award.title}" updated successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error updating award");
  }
}

export async function deleteAward(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Award");
    if (!id) return;

    const award = await Award.findByIdAndDelete(id);
    if (!award) return r.notFound(res, "Award not found");

    return r.sendSuccess(res, 200, `Award: "${award.title}" deleted successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error deleting award");
  }
}
