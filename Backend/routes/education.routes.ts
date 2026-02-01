import express from "express";
import {
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controller/education.controller.js";
import { loggedInUser } from "../middleware/auth.middleware.js";

const educationRouter = express.Router();

educationRouter.get("/public", getAllEducation);
educationRouter.post("/create-education", loggedInUser, createEducation);
educationRouter.patch("/update-education/:id", loggedInUser, updateEducation);
educationRouter.delete("/delete-education/:id", loggedInUser, deleteEducation);

export default educationRouter;
