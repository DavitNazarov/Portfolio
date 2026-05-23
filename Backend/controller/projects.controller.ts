import type { Request, Response } from "express";
import {
  bodyRecord,
  handleControllerError,
  hasRequiredFields,
  pickDefined,
  requestId,
} from "../lib/controller.js";
import { Projects } from "../model/Projects.model.js";
import * as r from "../lib/response.js";

const REQUIRED = ["name", "description", "year", "githubLink", "liveLink", "technologies"] as const;
type ProjectUpdate = {
  name: string;
  description: string;
  year: number;
  githubLink: string;
  liveLink: string;
  technologies: string[];
};

export async function createProject(req: Request, res: Response) {
  try {
    const body = bodyRecord(req);
    if (!hasRequiredFields(body, REQUIRED)) return r.badRequest(res, "All fields are required");
    const { name, description, year, githubLink, liveLink, technologies } = body;

    const existing = await Projects.findOne({ name });
    if (existing) return r.badRequest(res, `Project "${name}" already exists`);

    await Projects.create({ name, description, year, githubLink, liveLink, technologies });
    return r.sendSuccess(res, 201, `Project "${name}", created successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error creating project");
  }
}

export async function getAllProjects(req: Request, res: Response) {
  try {
    const projects = await Projects.find();
    return r.sendSuccess(res, 200, "Projects fetched successfully", { projects });
  } catch (error) {
    return handleControllerError(res, error, "Error fetching projects");
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Project");
    if (!id) return;

    const body = bodyRecord(req);
    const updateData = pickDefined<ProjectUpdate>(body, REQUIRED);
    if (body.year !== undefined) updateData.year = Number(body.year);

    const project = await Projects.findByIdAndUpdate(id, updateData, { new: true });
    if (!project) return r.notFound(res, "Project is not found");

    return r.sendSuccess(res, 200, `Project "${project.name}" from ${project.year}, updated successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error updating project");
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const id = requestId(req, res, "Project");
    if (!id) return;

    const project = await Projects.findByIdAndDelete(id);
    if (!project) return r.notFound(res, "Project is not found");

    return r.sendSuccess(res, 200, `Project "${project.name}", deleted successfully`);
  } catch (error) {
    return handleControllerError(res, error, "Error deleting project");
  }
}
