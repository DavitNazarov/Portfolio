import express from "express";
import {
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controller/education.controller.js";
import { loggedInUser, requireAdmin } from "../middleware/auth.middleware.js";

const educationRouter = express.Router();

educationRouter.get("/public", getAllEducation);
educationRouter.get("/get-all-education", loggedInUser, requireAdmin, getAllEducation);
educationRouter.post("/create-education", loggedInUser, requireAdmin, createEducation);
educationRouter.patch("/update-education/:id", loggedInUser, requireAdmin, updateEducation);
educationRouter.delete("/delete-education/:id", loggedInUser, requireAdmin, deleteEducation);

export default educationRouter;
