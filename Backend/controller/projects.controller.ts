import { Request, Response } from "express";
import { Projects } from "../model/Projects.model.js";
import { isDbConnectionError } from "../lib/dbError.js";
import * as r from "../lib/response.js";

const REQUIRED = ["name", "description", "year", "githubLink", "liveLink", "technologies"] as const;

function hasAll(body: Record<string, unknown>): body is Record<(typeof REQUIRED)[number], unknown> {
  return REQUIRED.every((k) => body[k] != null && (Array.isArray(body[k]) ? (body[k] as unknown[]).length > 0 : true));
}

export async function createProject(req: Request, res: Response) {
  try {
    if (!hasAll(req.body)) return r.badRequest(res, "All fields are required");
    const { name, description, year, githubLink, liveLink, technologies } = req.body;

    const existing = await Projects.findOne({ name });
    if (existing) return r.badRequest(res, `Project "${name}" already exists`);

    await Projects.create({ name, description, year, githubLink, liveLink, technologies });
    return r.sendSuccess(res, 201, `Project "${name}", created successfully`);
  } catch (error) {
    console.error("Error creating project", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function getAllProjects(req: Request, res: Response) {
  try {
    const projects = await Projects.find();
    return r.sendSuccess(res, 200, "Projects fetched successfully", { projects });
  } catch (error) {
    console.error("Error fetching projects", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Project ID is required");

    const updateData: Partial<{ name: string; description: string; year: number; githubLink: string; liveLink: string; technologies: string[] }> = {};
    const { name, description, year, githubLink, liveLink, technologies } = req.body;
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (year !== undefined) updateData.year = Number(year);
    if (githubLink !== undefined) updateData.githubLink = githubLink;
    if (liveLink !== undefined) updateData.liveLink = liveLink;
    if (technologies !== undefined) updateData.technologies = technologies;

    const project = await Projects.findByIdAndUpdate(id, updateData, { new: true });
    if (!project) return r.notFound(res, "Project is not found");

    return r.sendSuccess(res, 200, `Project "${project.name}" from ${project.year}, updated successfully`);
  } catch (error) {
    console.error("Error updating project", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return r.badRequest(res, "Project ID is required");

    const project = await Projects.findByIdAndDelete(id);
    if (!project) return r.notFound(res, "Project is not found");

    return r.sendSuccess(res, 200, `Project "${project.name}", deleted successfully`);
  } catch (error) {
    console.error("Error deleting project", error);
    return isDbConnectionError(error) ? r.serviceUnavailable(res) : r.serverError(res);
  }
}
