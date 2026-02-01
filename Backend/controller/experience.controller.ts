import { Request, Response } from "express";
import { Experience } from "../model/Experience.model.js";
import { IExperience } from "../types/ExperienceTypes.js";

export async function createExperience(req: Request, res: Response) {
  try {
    const { role, company, period, description, tech } = req.body;
    if (!role || !company || !period || !description || !tech) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error",
      });
    }

    const newExperience = await Experience.create({
      role,
      company,
      period,
      description,
      tech,
    });
    await newExperience.save();
    res.status(201).json({
      message: `Experience: "${role}" at "${company}", created successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error creating experience", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}

export async function getAllExperience(req: Request, res: Response) {
  try {
    const experiences = await Experience.find();
    res.status(200).json({
      message: "Experiences fetched successfully",
      status: "success",
      experiences,
    });
  } catch (error) {
    console.error("Error fetching experiences", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}

export async function updateExperience(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { role, company, period, description, tech } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Experience ID is not found",
        status: "error",
      });
    }

    const updateData: Partial<IExperience> = {};

    if (role !== undefined) updateData.role = role;
    if (company !== undefined) updateData.company = company;
    if (period !== undefined) updateData.period = period;
    if (description !== undefined) updateData.description = description;
    if (tech !== undefined) updateData.tech = tech;

    const experience = await Experience.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!experience) {
      return res.status(404).json({
        message: "Experience is not found",
        status: "error",
      });
    }

    res.status(200).json({
      message: `Experience: "${experience.role}" at "${experience.company}", updated successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error updating experience", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}

export async function deleteExperience(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Experience ID is required",
        status: "error",
      });
    }

    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      return res.status(404).json({
        message: "Experience is not found",
        status: "error",
      });
    }

    res.status(200).json({
      message: `Experience: "${experience.role}" at "${experience.company}", deleted successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error deleting experience", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}
