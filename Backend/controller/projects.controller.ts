import { Request, Response } from "express";
import { Projects } from "../model/Projects.model.js";

export async function createProject(req: Request, res: Response) {
  try {
    const { name, description, year, githubLink, liveLink, technologies } =
      req.body;
    if (
      !name ||
      !description ||
      !year ||
      !githubLink ||
      !liveLink ||
      !technologies
    ) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error",
      });
    }

    const existingProject = await Projects.findOne({ name });
    if (existingProject) {
      return res.status(400).json({
        message: `Project:${name} already exists`,
        status: "error",
      });
    }

    const newProject = await Projects.create({
      name,
      description,
      year,
      githubLink,
      liveLink,
      technologies,
    });
    await newProject.save();
    res.status(201).json({
      message: `Project:${name}, created successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error creating project", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}

export async function getAllProjects(req: Request, res: Response) {
  try {
    const projects = await Projects.find();
    res.status(200).json({
      message: "Projects fetched successfully",
      status: "success",
      projects,
    });
  } catch (error) {
    console.error("Error creating project", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, year, githubLink, liveLink, technologies } =
      req.body;
    if (!id) {
      return res.status(400).json({
        message: "Project ID is required",
        status: "error",
      });
    }

    // Only update fields that were actually sent (partial update support)
    const updateData: Partial<{
      name: string;
      description: string;
      year: number;
      githubLink: string;
      liveLink: string;
      technologies: string[];
    }> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (year !== undefined) updateData.year = Number(year);
    if (githubLink !== undefined) updateData.githubLink = githubLink;
    if (liveLink !== undefined) updateData.liveLink = liveLink;
    if (technologies !== undefined) updateData.technologies = technologies;

    const project = await Projects.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project is not found",
        status: "error",
      });
    }

    res.status(200).json({
      message: `Project: "${project.name}" from ${project.year}, updated successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error updating project", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}
export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Project ID is required",
        status: "error",
      });
    }
    const project = await Projects.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({
        message: "Project is not found",
        status: "error",
      });
    }
    res.status(200).json({
      message: `Project: "${project.name}", deleted successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error deleting project", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}
