import { Request, Response } from "express";
import { Education } from "../model/education.model.js";
import { IEducation } from "../types/educationTypes.js";

export async function getAllEducation(req: Request, res: Response) {
  try {
    const education = await Education.find();
    res.status(200).json({
      message: "Education fetched successfully",
      status: "success",
      education,
    });
  } catch (error) {
    console.error("Error fetching education", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}
export async function createEducation(req: Request, res: Response) {
  try {
    const { degree, institution, period, description, present } = req.body;
    if (!degree || !institution || !period || !description || !present) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error",
      });
    }

    const existingEducation = await Education.findOne({
      degree,
      institution,
      period,
    });
    if (existingEducation) {
      return res.status(400).json({
        message: `Education: ${degree} at ${institution}, already exists`,
        status: "error",
      });
    }

    const newEducation = await Education.create({
      degree,
      institution,
      period,
      description,
      present,
    });
    await newEducation.save();
    res.status(201).json({
      message: `Education: ${degree} at ${institution}, created successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error creating education", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}

export async function updateEducation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Education ID is not found",
        status: "error",
      });
    }
    const { degree, institution, period, description, present } = req.body;
    if (!degree || !institution || !period || !description || !present) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error",
      });
    }
    const updateData: Partial<IEducation> = {};
    if (degree !== undefined) updateData.degree = degree;
    if (institution !== undefined) updateData.institution = institution;
    if (period !== undefined) updateData.period = period;
    if (description !== undefined) updateData.description = description;
    if (present !== undefined) updateData.present = present;

    const education = await Education.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!education) {
      return res.status(404).json({
        message: "Education is not found",
        status: "error",
      });
    }

    res.status(200).json({
      message: `Education: ${degree} at ${institution}, updated successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error updating education", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}
export async function deleteEducation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Education ID is not found",
        status: "error",
      });
    }
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return res.status(404).json({
        message: "Education is not found",
        status: "error",
      });
    }
    res.status(200).json({
      message: `Education: ${education?.degree} at ${education?.institution}, deleted successfully`,
      status: "success",
    });
  } catch (error) {
    console.error("Error deleting education", error);
    res.status(500).json({
      message: "Internal server error, please try again later",
      status: "error",
    });
  }
}
